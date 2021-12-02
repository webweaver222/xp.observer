"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require("body-parser");
const moment = require("moment");
const routingTools_1 = require("../tools/routingTools");
const serverStartup = moment().add(3, "hour").format("DD/MM/YYY HH:mm:ss");
exports.default = (app) => {
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requeted-With, Content-Type, Accept,*, Authorization, RBR, access-token");
        if (req.headers.origin) {
            res.header("Access-Control-Allow-Origin", "*");
        }
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            return res.status(200).json({});
        }
        next();
    });
    app.get("/", (req, res) => res.send((0, routingTools_1.successfulBody)(serverStartup)));
};
//# sourceMappingURL=serverMiddleware.js.map