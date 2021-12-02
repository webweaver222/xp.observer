//import RefreshToken from "../models/organization/refreshToken"

export const MONGO_URI: string =
  process.env.MONGO_URI ||
  "mongodb+srv://dor:jWaCcrXZ9KUGeoaZ@local.otjgm.mongodb.net/dor-flix?retryWrites=true&w=majority";

export const PORT: string = process.env.PORT || "3100";
export const IS_PROD: boolean = process.env.NODE_ENV === "production";
export const TWOFA: boolean = process.env.TWOFA
  ? process.env.TWOFA === "true"
  : false; // system has 2fa on user login

export const SECRET_KEY: string =
  process.env.SECRET_KEY ||
  "70BD3BC91244210A68A01743314124241D0ABAEA49232142413214F82BC994F6B733E66404D972421418011421E02E24ED9";

export const LOGIN_RETRY_LIMIT: number = process.env.LOGIN_RETRY_LIMIT
  ? parseInt(process.env.LOGIN_RETRY_LIMIT)
  : 5;

export const MONGO_COLLECTIONS = {
  Organizations: "Organizations".toLowerCase(),
  UserPermissions: "UserPermissions".toLowerCase(),
  Users: "Users".toLowerCase(),
  RefreshTokens: "RefreshTokens".toLowerCase(),
  TwofaCodes: "TwofaCodes".toLowerCase(),
  UserAuthorizedIPs: "UserAuthorizedIPs".toLowerCase(),
  UserLogs: "UserLogs".toLowerCase(),
  Logs: "Logs".toLowerCase(),
  LoginBlocks: "LoginBlocks".toLowerCase(),
  LoginTokens: "LoginTokens".toLowerCase(),

  Courses: "Courses".toLowerCase(),
  Seasons: "Seasons".toLowerCase(),
  Episodes: "Episodes".toLowerCase(),
  SubEpisodes: "SubEpisodes".toLowerCase(),
  PersonalNotes: "PersonalNotes".toLowerCase(),
  Comments: "Comments".toLowerCase(),
  Lecturers: "Lecturers".toLowerCase(),
  UserPositions: "UserPositions".toLowerCase(),
  ViewedSubEpisodes: "ViewedSubEpisodes".toLowerCase(),
  ViewedEpisodes: "ViewedEpisodes".toLowerCase(),
  CurrentEpisodes: "CurrentEpisodes".toLowerCase(),
  Bookmarks: "Bookmarks".toLowerCase(),
  LastSeen: "LastSeen".toLowerCase(),
  Trailer: "Trailer".toLowerCase(),
  //RefreshToken: 'RefreshTokens'.toLowerCase(),
}; //

export const wallets = [
  "0x0Ed67dAaacf97acF041cc65f04A632a8811347fF",
  "0x6d16749cEfb3892A101631279A8fe7369A281D0E",
  "0x1D4389cf898F39A882AAF2FC7765069c556876F0",
  "0xD266d61ac22C2a2Ac2Dd832e79c14EA152c998D6",
  "0x1e4A697438833CA6e514E28230c503576648Dea9",
  "0x840f461D7826A6EaC3ba0Ff21c1bBEf4F775aa75",
  "0xCEd35166d78a980a11fE563c9D3f6b7D5DfB730D",
  "0xFf400a063FAF8a3e5630319b79e89332E222DEDd",
  "0xF6A3d6eb5DD35f39913d21e7c43CcAd20427aaA8",
  "0xe38FD1c83BB7883Adc4B5B910C6F6e8311da3B6F",
  "0x394BA329742e8c558952f3dBA91b456Ab8C6332d",
  "0x04AE9Bf8a3493De5Fc00df1497A75bf7461622b2",
  "0x1b95513eFD5E88267c85cFd4e16988ce929665E5",
];
