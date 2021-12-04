import axios from "axios";
import collect from "./Collector";

import TransferEventModel, {
  TokenTransferEventResponse,
  TokenTransferEvent,
} from "../models/TokenTransferEvent";

import DataMapper from "../tools/mongodb/dataMapper";

const mockFetch = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          blockNumber: "12991320",
          timeStamp: "1637998791",
          hash: "0x379b0727d1195f19900aafec02803310a1a63c1b7fbe1310fa0d6229481ada7f",
          nonce: "680",
          blockHash:
            "0xb4983e37c7a8b48647acab621b00f7817169e16f908f1fa601461c3c9c32bcb7",
          from: "0x0ed67daaacf97acf041cc65f04a632a8811347ff",
          contractAddress: "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a",
          to: "0xde5833f2bfde80aeaac054c8c0162ecc3e6f41f8",
          value: "20000321634188225729746",
          tokenName: "XP.network",
          tokenSymbol: "XPNET",
          tokenDecimal: "18",
          transactionIndex: "52",
          gas: "214338",
          gasPrice: "6600000000",
          gasUsed: "169658",
          cumulativeGasUsed: "6694354",
          input: "deprecated",
          confirmations: "194419",
        },
      ]);
    }, 0);
  });

class Poller {
  apiKey: string;
  contractAddress: string;

  constructor(apiKey: string, contractAddress: string) {
    this.apiKey = apiKey;
    this.contractAddress = contractAddress;
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

          const start = doc ? doc.block : "0";
          const offset = doc ? "" : "1";
          const page = doc ? "" : "1";

          const {
            data: { result, status, message },
          } = await this.fetchSingle(wallets[i], start, offset, page);

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
