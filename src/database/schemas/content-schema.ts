import {Document, Schema, Model, model,} from "mongoose";
import {ContentDb} from "../interfaces/content-db";

export interface IContentModel extends Document, ContentDb {
}

const ContentSchema: Schema = new Schema({
    src: String
}, {timestamps: true});


export const Content: Model<IContentModel> = model<IContentModel>("Content", ContentSchema);