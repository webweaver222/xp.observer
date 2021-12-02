import axios from "axios";
//import {TransferEvent} from '../models/course/interfaces/TransferEvent'

interface fetchParams {
  address: string;
  start: string;
  end: string;
}

export default class Scrapper {
  apiKey: string;
  contractAddress: string;

  constructor(apiKey: string, contractAddress: string) {
    this.apiKey = apiKey;
    this.contractAddress = contractAddress;
  }

  private fetchSingle = (
    address: string,
    start: string = "0",
    end: string = "999999999",
    offset: string = "1"
  ) => {
    const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${this.contractAddress}&address=${address}&page=1&offset=${offset}&startblock=${start}&endblock=${end}&sort=desc&apikey=${this.apiKey}`;
    return axios.get(uri);
  };

  public async fetchWallets(wallets: string[], TransferEventModel, cb) {
    const find = await TransferEventModel.find({});

    console.log(find);

    const reccur = (i = 0) => {
      if (i >= wallets.length) return;

      setTimeout(async () => {
        const res = await this.fetchSingle(wallets[i] /*start*/);

        cb(res.data.result);
        i++;
        reccur(i);
      }, 1);
    };

    //reccur(0);
  }
}
