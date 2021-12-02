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
//import { MISSING_BODY_VALUES } from "../../config/errorStrings"
//import { Flix } from "../../services/flix"
//import { isNumber } from 'lodash'
const routingTools_1 = require("../../tools/routingTools");
//import { toObjectId } from "../../tools/string"
//import Bookmark from "../../models/course/bookmark"
//import Lecturer from "../../models/course/lecturer"*/
function courseRoutes(app) {
    test(app, "/test");
    test(app, "/test1");
}
exports.default = courseRoutes;
const test = (app, route) => {
    app.get(route, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send((0, routingTools_1.successfulBody)());
    }));
};
//# sourceMappingURL=courseRoutes.js.map