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
import { clearInterval } from "timers";

const moment = require("moment");

const abiDecoder = require("abi-decoder");

const apikey = "5XSASUJU5RXXV6767Z85W7QTB4JQ8M3V7I";
const contractAddress = "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A";

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

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("912172748:AAEKz9saVWJiPa19B5M1UACIPKF4kdpmF18", {
  polling: true,
});

const debugBot = new TelegramBot(
  "5053985231:AAHNrvuXSGW4nVRYqcZVHCI4FpkCA600Ua0",
  {
    polling: true,
  }
);

const chatID = "-1001487343874";
const debugChat = "1062713330";

export default http.listen(PORT, async () => {
  console.log(`Server runs on ${PORT}`);
  let c: number;

  const main = async (decoder) => {
    console.log(`Cycle #${c}`);
    try {
      const result = await poller(
        apikey,
        contractAddress
      ).getLatestTransactions();

      if (result.hasNewTransfers) {
        const filtred = await analyser(
          result,
          decoder,
          contractAddress
        ).filterTransactions();

        if (filtred.length > 0) {
          console.log(filtred);
        }
      }

      await new Promise((resolve) => setTimeout(() => resolve(null), 10000));
      c++;
      main(decoder);
    } catch (e) {
      console.log(e);
      debugBot.sendMessage(
        debugChat,
        `${e.message} ${moment()}||||----WILL TRY TO RESTART----|||||`
      );
      main(decoder);
    }
  };

  try {
    const { data } = await poller(apikey, contractAddress).getABI();
    console.log(data);
    abiDecoder.addABI(JSON.parse(data.result.abi));
    main(abiDecoder);
  } catch (e) {
    console.log(e);
    debugBot.sendMessage(
      debugChat,
      `Error on trying to get ABI file ${moment()}`
    );
  }
});
