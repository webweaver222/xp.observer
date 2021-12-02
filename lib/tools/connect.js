"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const keys_1 = require("../config/keys");
mongoose.connect(keys_1.MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (err)
        console.log("Error on MongoDB connection", err);
    else
        console.log("Connected to MongoDB");
});
exports.default = mongoose;
//# sourceMappingURL=connect.js.map