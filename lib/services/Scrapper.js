"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Scrapper {
    constructor(apiKey, contractAddress) {
        this.offset = "1";
        this.fetchSingle = (address, start = "0", end = "999999999") => {
            const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${this.contractAddress}&page=1&offset=${this.offset}&startblock=${start}&endblock=${end}&sort=desc&apikey=${this.apiKey}`;
            return axios_1.default.get(uri);
        };
        this.apiKey = apiKey;
        this.contractAddress = contractAddress;
    }
    fetchTransactions(start = "0", end = "999999999") {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${this.contractAddress}&address=${""}&page=1&offset=${"100"}&startblock=${start}&endblock=${end}&sort=desc&apikey=${this.apiKey}`);
        });
    }
    fetchWallets(wallets, cb) {
        const reccur = (i = 0) => {
            const results = [];
            if (i >= wallets.length)
                return;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                const res = yield this.fetchSingle(wallets[i]);
                cb(res.data.result);
                i++;
                reccur(i);
            }), 200);
        };
        reccur(0);
    }
}
exports.default = Scrapper;
//# sourceMappingURL=Scrapper.js.map