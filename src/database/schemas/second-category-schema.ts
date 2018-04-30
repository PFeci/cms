import {Document, Schema, Model, model,} from "mongoose";
import {SecondCategoryDb} from "../interfaces/second-category-db";

export interface ISecondCategoryModel extends Document, SecondCategoryDb {
}

const SecondCategorySchema: Schema = new Schema({
    name: String
}, {timestamps: true});


export const SecondCategory: Model<ISecondCategoryModel> = model<ISecondCategoryModel>("SecondCategory", SecondCategorySchema);