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
const express = require("express");
const mongoose = require("mongoose");
const socket_io_1 = require("socket.io");
const courseRoutes_1 = require("./userRoutes/courseRoutes");
const serverMiddleware_1 = require("./serverMiddleware");
const websocket_1 = require("../websocket/websocket");
const keys_1 = require("../config/keys");
const TransferEvent_1 = require("../models/course/interfaces/TransferEvent");
const Scrapper_1 = require("../services/Scrapper");
const apikey = "7SQ3B3IQHGIJYM8MSDM7IVH98XJNG3I9VQ";
const contractAddress = "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A";
const api = new Scrapper_1.default(apikey, contractAddress);
const getTokenPrice = `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`;
const app = express();
let http = require("http").Server(app);
const io = new socket_io_1.Server(http, {});
mongoose.connect(keys_1.MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (err)
        console.log("Error on MongoDB connection", err);
    else
        console.log("Connected to MongoDB");
});
(0, serverMiddleware_1.default)(app);
io.attach(http);
io.on("connection", (socket) => (0, websocket_1.default)(socket));
(0, courseRoutes_1.default)(app);
exports.default = http.listen(keys_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server runs on ${keys_1.PORT}`);
    api.fetchWallets(keys_1.wallets, TransferEvent_1.default, (res) => { });
    //await doc.save();
    // doc = await event.save();
    //console.log(doc);
    //const {
    // data: {
    //data: { price },
    //},
    //} = await axios.get(getTokenPrice);
}));
//# sourceMappingURL=webServer.js.map