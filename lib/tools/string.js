"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectId = exports.toObjectId = void 0;
const mongoose = require("mongoose");
// import * as bcryptjs from 'bcryptjs'
/**
 * Converts a string to a MongoDb ObjectId
 * @param {string} str a string to be converted to ObjectId
 * @returns a MongoDb ObjetId
 */
const toObjectId = (str) => mongoose.Types.ObjectId(str);
exports.toObjectId = toObjectId;
// export const hashString = async (str: string) => await bcryptjs.hash(str, 10)
const isObjectId = (str) => mongoose.isValidObjectId(str);
exports.isObjectId = isObjectId;
//# sourceMappingURL=string.js.map