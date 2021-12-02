import * as express from "express";
import * as mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import userRoutes from "./userRoutes/courseRoutes";
import middleware from "./serverMiddleware";
import websocket from "../websocket/websocket";
import { MONGO_URI, PORT, wallets } from "../config/keys";

import TransferEventModel from "../models/course/interfaces/TransferEvent";

import Scrapper from "../services/Scrapper";

const apikey = "7SQ3B3IQHGIJYM8MSDM7IVH98XJNG3I9VQ";
const contractAddress = "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A";

const api = new Scrapper(apikey, contractAddress);

const getTokenPrice = `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`;

const app = express();
let http = require("http").Server(app);
const io = new Server(http, {});

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err: any) => {
  if (err) console.log("Error on MongoDB connection", err);
  else console.log("Connected to MongoDB");
});

middleware(app);

io.attach(http);
io.on("connection", (socket: Socket) => websocket(socket));

userRoutes(app);

export default http.listen(PORT, async () => {
  console.log(`Server runs on ${PORT}`);

  api.fetchWallets(wallets, TransferEventModel, (res) => {});

  //await doc.save();

  // doc = await event.save();

  //console.log(doc);

  //const {
  // data: {
  //data: { price },
  //},
  //} = await axios.get(getTokenPrice);
});
