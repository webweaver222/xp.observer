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
exports.schema = exports.docBookmark = void 0;
const mongoose_1 = require("mongoose");
const keys_1 = require("../../config/keys");
const documentDefaults_1 = require("../../tools/mongodb/documentDefaults");
// used to fetch jwt
exports.docBookmark = {
    episodeId: { type: mongoose_1.Schema.Types.ObjectId },
    timestamp: { type: mongoose_1.Schema.Types.Number },
    userId: { type: mongoose_1.Schema.Types.ObjectId },
};
exports.schema = documentDefaults_1.CustomDocumentBuild(exports.docBookmark);
exports.schema.statics.getByEpisode = function getByEpisode(episodeId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.findOne({ episodeId, userId });
        return query.exec().then((r) => r ? r : undefined);
    });
};
/**
 * MODEL Bookmark, used for interactions with MongoDB
 */
const Bookmark = mongoose_1.model(keys_1.MONGO_COLLECTIONS.Bookmarks, exports.schema);
exports.default = Bookmark;
//# sourceMappingURL=bookmark.js.map