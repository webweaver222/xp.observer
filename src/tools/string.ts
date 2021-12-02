import * as mongoose from 'mongoose';
// import * as bcryptjs from 'bcryptjs'

/**
 * Converts a string to a MongoDb ObjectId
 * @param {string} str a string to be converted to ObjectId
 * @returns a MongoDb ObjetId
 */
export const toObjectId = (str: string) => mongoose.Types.ObjectId(str)

// export const hashString = async (str: string) => await bcryptjs.hash(str, 10)

export const isObjectId = (str: string) => mongoose.isValidObjectId(str)
