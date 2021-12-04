import * as express from "express";
import * as mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import userRoutes from "./userRoutes/courseRoutes";
import middleware from "./serverMiddleware";
import websocket from "../websocket/websocket";
import { MONGO_URI, PORT, wallets } from "../config/keys";

import poller from "../services/Poller";
import analyser from "../services/Analyser";
import { throws } from "assert";

const apikey = "7SQ3B3IQHGIJYM8MSDM7IVH98XJNG3I9VQ";
const contractAddress = "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A";

//const poller = new Poller(apikey, contractAddress);

//const getTokenPrice = `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`;

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

  try {
    const time = Date.now();
    const results = await poller(apikey, contractAddress).fetchWallets(
      wallets,
      60
    );

    const forNotification = analyser(results).filterByCriteria();

    console.log(forNotification);

    //console.log(results);
    //const t;
    console.log(((Date.now() - time) / 1000).toString());
  } catch (e) {
    console.log(e);
  }
});
