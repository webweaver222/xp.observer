import { Document, Model } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface IBookmark {
    episodeId:ObjectId,
    userId:ObjectId,
    timestamp: number
}

// Instance methods
export interface IBookmarkDocument extends IBookmark, Document {
    toJSON();
}


// Static methods
export interface IBookmarkModel extends Model<IBookmarkDocument> {
    getById(to: ObjectId): Promise<IBookmarkDocument>
    getByToken(token: string): Promise<IBookmarkDocument>
    removeById(id: ObjectId): Promise<boolean>
    updateById(id: ObjectId, doc: IBookmark): Promise<IBookmarkDocument>
    createNew(doc: IBookmark): Promise<IBookmarkDocument>
}