"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    block: { type: String, required: true },
});
const TransferEventModel = (0, mongoose_1.model)("TransferEvent", schema);
exports.default = TransferEventModel;
//# sourceMappingURL=TransferEvent.js.map