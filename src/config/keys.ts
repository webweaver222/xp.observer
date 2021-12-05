//import RefreshToken from "../models/organization/refreshToken"

export const MONGO_URI: string =
  process.env.MONGO_URI ||
  //"mongodb://localhost:27017/notifier" ||
  "mongodb+srv://dor:jWaCcrXZ9KUGeoaZ@local.otjgm.mongodb.net/TESTDB";

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
  "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A",
  /*"0x0Ed67dAaacf97acF041cc65f04A632a8811347fF",
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
  "0x7e1d47766806855f1C18ABa31A079a6b818F9faE",
  "0x16ebDd55fCE5319b1A6229d19C3Fa081C851548f",
  "0x2284Adde3f047f74f8DDC9D181a4ed749eAFa3Ca",
  "0xA2dCB52F5cF34a84A2eBFb7D937f7051ae4C697B",
  "0xcEd29BA48490C51E4348e654C313AC97762beCCC",
  "0xb5a5B9d508AD42Bb3d529550EB2eF790004Db146",
  "0x8EC8226cecC3D7E23a9fA9aC3F07fcE5143C363c",
  "0x75351B603e7282c2981902d01caE3123BBcC08D0",
  "0xC1F562c56B4cf3B0627174649637FC6A3843B4ea",
  "0xEaf554e92C8820bfd1ceaF17fF3Aa5D08C9E5D4f",
  "0x812f5216aA2a98e498E41b96721fdDD0eb3126FD",
  "0xc9C912Cda1e0E6A3268C9c8dC76de5A2CbCC1Ae5",
  "0x9aa23ADCFCC6D037F1211D64825B4687AF3039B6",
  "0x50899582199c06d5264edDCD12879E5210783Ba8",
  "0x4553eD5d8d3731E629f67BD86abd021175F31848",
  "0xE2e165c90850F0dFa274550a9503d732046Adb0C",
  "0x74726c43FafD8f9C3d50A9F63820bfB8860F3481",
  "0xFD3858DF77c92053c5A823d3f9a8b14dA83E80fc",
  "0x84fabd111c71a5a0b20e5864ffcb213c7429e556",
  "0x89D06C29F9c4fE15D54636679F83319EB5254406",
  "0x70bE2bFE60d875FAAd5922F2379aF1a0AFC8e754",
  "0xE9D37F5498323b4270BBC3bf26a6C13A7Fb30077",
  "0x1a3f00A013670BEcaF3E51B5DB8c0A530B5Bf08f",
  "0x37aD1dA8b0f0970bCa666BC6B3c91DC2Ed4E09ba",
  "0x475210b071428A2263325008102799D9362a2d43",
  "0x44769F146A74Abc66fAA1A16D9C2B5608EDEA627",
  "0x46863d407a8C4A3d5a5A28BF89794c40d406A6A5",
  "0x48714Ca6F07Fb0150D4B20Bf584Fe9C48D9a5859",
  "0x989A1Ce5Fb8cB736d8fdb2121587B3d8AfE6656e",
  "0x3fe4B9C51e238cB90a25A11e13167E37ff974298",
  "0x2D69BAB9738b05048be16DE3E5E0A945b8EeEf3a",
  "0x7648C306203214B08FEc7670e8B76cb845d5F720",
  "0x605F3E3e5AdB86DedF3966dAa9cA671199C27f44",
  "0x338A63A261938D0a2aAb0EbeFaD29Ff90f492a7f",
  "0xd794200Dec4f0344600CE3858147c251792A9629",
  "0xf4894288494D4d30Bf1e00403b2D303f786aF754",
  "0x3943b578D00D61b622Fd99AB6F16921e54F7612b",
  "0x38F2944e482a050942E5fb1652Af4690017cd141",
  "0xCa9061Ae96f2728259E328AEda513270532FC43d",
  "0x6BCa4e13402283142D6D326f5b249e49d48b2A26",
  "0xe778d62709D44129248e7016CC50148e49472bBe",
  "0xd7A9c1b328CfD3CF00bCDe4FE9b4118c49bB27d0",
  "0x7f71EDdD7ed083aEd2A49383fFAAe548444E4f1E",
  "0xDd071d33bfCf21286ac874C9617A9b350B3072c1",
  "0xa1d0B3B360595A82dbAAC1667535579bC568F8DD",
  "0x81289cFbD5a01293391D1ab9dC46c5ee21371341",*/
];
