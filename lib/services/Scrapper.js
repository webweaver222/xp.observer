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
        this.fetchSingle = (address, start = "0", end = "999999999", offset = "1") => {
            const uri = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${this.contractAddress}&address=${address}&page=1&offset=${offset}&startblock=${start}&endblock=${end}&sort=desc&apikey=${this.apiKey}`;
            return axios_1.default.get(uri);
        };
        this.apiKey = apiKey;
        this.contractAddress = contractAddress;
    }
    fetchWallets(wallets, TransferEventModel, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield TransferEventModel.find({});
            console.log(find);
            const reccur = (i = 0) => {
                if (i >= wallets.length)
                    return;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const res = yield this.fetchSingle(wallets[i] /*start*/);
                    cb(res.data.result);
                    i++;
                    reccur(i);
                }), 1);
            };
            //reccur(0);
        });
    }
}
exports.default = Scrapper;
//# sourceMappingURL=Scrapper.js.map