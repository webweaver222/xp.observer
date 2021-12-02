import { Document, model, Schema } from "mongoose";
import { ObjectId } from "mongodb";
import {
  IBookmark,
  IBookmarkDocument,
  IBookmarkModel,
} from "./interfaces/bookmark";
import { MONGO_COLLECTIONS } from "../../config/keys";
import { CustomDocumentBuild } from "../../tools/mongodb/documentDefaults";
// used to fetch jwt
export const docBookmark = {
  episodeId: { type: Schema.Types.ObjectId },
  timestamp: { type: Schema.Types.Number },
  userId: { type: Schema.Types.ObjectId },
};

export const schema = CustomDocumentBuild(docBookmark);

schema.statics.getByEpisode = async function getByEpisode(
  episodeId: ObjectId,
  userId: ObjectId
) {
  const query = this.findOne({ episodeId, userId });
  return query.exec().then((r: IBookmarkDocument) => (r ? r : undefined));
};

/**
 * MODEL Bookmark, used for interactions with MongoDB
 */

const Bookmark: IBookmarkModel = model<IBookmarkDocument, IBookmarkModel>(
  MONGO_COLLECTIONS.Bookmarks,
  schema
);
export default Bookmark;
export { IBookmark, IBookmarkDocument };
