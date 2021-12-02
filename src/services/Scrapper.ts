import axios from "axios";

interface fetchParams {
  address: string;
  start: string;
  end: string;
}

export default class Scrapper {
  apiKey: string;
  contractAddress: string;
  offset: string = "1";

  constructor(apiKey: string, contractAddress: string) {
    this.apiKey = apiKey;
    this.contractAddress = contractAddress;
  }

  private fetchSingle = (
    address: string,
    start: string = "0",
    end: string = "999999999"
  ) => {
    const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${this.contractAddress}&page=1&offset=${this.offset}&startblock=${start}&endblock=${end}&sort=desc&apikey=${this.apiKey}`;
    return axios.get(uri);
  };

  public async fetchTransactions(
    start: string = "0",
    end: string = "999999999"
  ) {
    return axios.get(
      `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${
        this.contractAddress
      }&address=${""}&page=1&offset=${"100"}&startblock=${start}&endblock=${end}&sort=desc&apikey=${
        this.apiKey
      }`
    );
  }

  public fetchWallets(wallets: string[], cb) {
    const reccur = (i = 0) => {
      const results: any = [];
      if (i >= wallets.length) return;
      setTimeout(async () => {
        const res = await this.fetchSingle(wallets[i]);

        cb(res.data.result);
        i++;
        reccur(i);
      }, 200);
    };

    reccur(0);
  }
}
