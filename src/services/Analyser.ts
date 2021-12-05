import {
  TokenTransferEvent,
  DecodedInput,
  Transfer,
} from "../models/TokenTransferEvent";
import axios from "axios";

import { toFixed } from "../tools/helpers";

const Web3 = require("web3");
var web3 = new Web3();

class Analyser {
  data: Transfer[];
  decoder;
  contractAddress: string;
  getTokenPrice: string;

  constructor(results: any[], decoder, contractAddress: string) {
    this.data = results;
    this.decoder = decoder;
    this.contractAddress = contractAddress;
    this.getTokenPrice = `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`;
  }

  async filterTransactions(moneyFilter: number = 1, method = "transfer") {
    const {
      data: {
        data: { price },
      },
    } = await axios.get(this.getTokenPrice);

    console.log(price);
    return this.data.filter((transfer) => {
      const decodedInput: DecodedInput = this.decoder.decodeMethod(
        transfer.input
      );

      const {
        input: { name, params },
      } = {
        ...transfer,
        input: decodedInput,
      };

      //console.log(params);
      const methodMatch = name === method;

      const valueWei = params.find((param) => param.name === "amount")?.value;

      const valueEther = web3.utils.fromWei(valueWei, "ether");

      const amount = Number(price) * Number(valueEther);

      const matctAmount = amount >= moneyFilter;

      transfer.amount = String(amount);

      if (methodMatch && matctAmount) return true;
    });
  }
}

const analyzer = (results: any[], decoder, contractAddress) =>
  new Analyser(results, decoder, contractAddress);

export default analyzer;
export type { Analyser };
