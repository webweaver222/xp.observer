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
exports.CustomDocumentBuild = void 0;
const mongoose_1 = require("mongoose");
/**
 * Adds Custom CRUD to a document schema: createNew, getById, removeById, updateById
 * @param custDoc - a mongo document
 * @returns custom CRUD document schema
 */
const CustomDocumentBuild = (custDoc) => {
    var schema = new mongoose_1.Schema(custDoc, {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    });
    schema.index({ '$**': 'text' });
    schema.set('toJSON', {
        transform(doc, ret) {
            delete ret.__v;
        },
    });
    schema.set('toObject', {
        transform(doc, ret) {
            delete ret.__v;
        },
    });
    /**
     * Saves the document data to MongoDB
     * @param {*} newDocument - a new Object
     * @returns the saved Store
     */
    schema.statics.createNew = function createNew(newDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this(newDocument).save();
        });
    };
    /**
     * Looks up a Document in the DB
     * @param {ObjectId} _id a Document ID
     * @returns a Document if one is found by ID
     */
    schema.statics.getById = function getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.findOne({ _id });
            return query.exec().then((doc) => (doc ? doc : undefined));
        });
    };
    /**
     * Checks whether a given _id exists in the DB and deletes the Document with the _id
     * @param _id a Document ID
     * @returns true in case of success and false otherwise
     */
    schema.statics.removeById = function removeById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                const query = this.findOneAndRemove({ _id });
                query.exec().then((err, r) => {
                    if (err || !r)
                        rej();
                    else
                        res(true);
                });
            }));
        });
    };
    /**
     * Updates a document in the DB of one is found by ID
     * @param id - document object ID
     * @param updatedDocument - document with updated fields
     */
    schema.statics.updateById = function updateById(_id, updatedDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(updatedDocument, 'lalsldaslda');
            return new Promise((res, rej) => {
                const query = this.updateOne({ _id }, updatedDocument, { new: true });
                query.exec().then((r, err) => {
                    if (err || !r)
                        rej();
                    else
                        res(r);
                });
            });
        });
    };
    return schema;
};
exports.CustomDocumentBuild = CustomDocumentBuild;
//# sourceMappingURL=documentDefaults.js.map