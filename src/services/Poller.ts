import axios from "axios";
import collect from "./Collector";

import {
  TokenTransferEventResponse,
  TokenTransferEvent,
} from "../models/TokenTransferEvent";

import DataMapper from "../tools/mongodb/dataMapper";

import dataMapper from "../tools/mongodb/dataMapper";

class Poller {
  apiKey: string;
  contractAddress: string;

  constructor(apiKey: string, contractAddress: string) {
    this.apiKey = apiKey;
    this.contractAddress = contractAddress;
  }

  private fetchTransactions(
    start: string = "0",
    offset: string,
    page: string,
    end: string = "999999999"
  ) {
    const uri = `https://api.bscscan.com/api?module=account&action=txlist&address=${this.contractAddress}&startblock=${start}&endblock=${end}&page=${page}&offset=${offset}&sort=desc&apikey=${this.apiKey}`;

    return axios.get<any>(uri);
  }

  public async getLatestTransactions() {
    console.log("0");
    let doc = await DataMapper.findRecentTransaction();

    const start = doc ? doc.block : "0";
    const offset = doc ? "" : "1";
    const page = doc ? "" : "1";

    const {
      data: { status, result },
    } = await this.fetchTransactions(start, offset, page);

    if (status === "1" && result.length > 0) {
      console.log(result.length);
      const { blockNumber: lastBlock, hash } = result[0];

      await dataMapper.updateRecentTransaction(doc, lastBlock, hash);

      result.hasNewTransfers = doc?.block === lastBlock ? false : true;

      return result;
    }
  }

  public getABI() {
    const uri = `https://api.bscscan.com/api?module=contract&action=getabi&address=0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A&apikey=${this.apiKey}`;
    return axios.get<any>(uri);
  }

  private fetchSingle = (
    address: string,
    start: string = "0",
    offset: string,
    page: string,
    end: string = "999999999"
  ) => {
    const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${this.contractAddress}&address=${address}&page=${page}&offset=${offset}&startblock=${start}&endblock=${end}&sort=desc&apikey=${this.apiKey}`;

    return axios.get<any, TokenTransferEventResponse>(uri);
  };

  public fetchWallets(
    wallets: string[],
    timeout: number,
    requestFrequency: number = 1
  ): Promise<TokenTransferEvent[][]> {
    return new Promise((resolve, reject) => {
      const collector = collect(wallets.length)
        .timeout(timeout)
        .done((err, results) => {
          if (err) reject(err);
          resolve(results!);
        });

      const next = (i = 0) => {
        if (i >= wallets.length || collector.finished) return;

        setTimeout(async () => {
          let doc = await DataMapper.findTransferEvent(wallets[i]);

          const start = doc ? "0" : "0";
          const offset = doc ? "" : "";
          const page = doc ? "" : "";

          const {
            data: { result, status, message },
          } = await this.fetchSingle(wallets[i], start, offset, page);
          console.log(result);
          console.log(result.length);
          //const result: TokenTransferEvent[] & { hasNewTransfers: boolean } =
          //await mockFetch();

          if (message === "OK" && status !== "0" && result.length !== 0) {
            const lastBlock = result[0].blockNumber;

            await DataMapper.updateTransferEvent(doc, lastBlock, wallets[i]);

            //console.log(doc?.block);
            // console.log(lastBlock);

            result.hasNewTransfers = doc?.block === lastBlock ? false : true;
          }
          if (result.hasNewTransfers)
            console.log(
              `New Transfer at wallet #${wallets[i]}, block${doc?.block}`
            );
          collector.collect(result);
          next(++i);
        }, requestFrequency);
      };

      next();
    });
  }
}

const poller = (apiKey: string, contractAddress: string) =>
  new Poller(apiKey, contractAddress);

export default poller;
export type { Poller };
