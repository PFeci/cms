import {Document, Schema, Model, model,} from "mongoose";
import {CategoryDb} from "../interfaces/category-db";

export interface ICategoryModel extends Document, CategoryDb {
}

const CategorySchema: Schema = new Schema({
    name: String
}, {timestamps: true});


export const Category: Model<ICategoryModel> = model<ICategoryModel>("Category", CategorySchema);