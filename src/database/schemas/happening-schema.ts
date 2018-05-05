import {Document, Schema, Model, model,} from "mongoose";
import {HappeningDb} from "../interfaces/happening-db";

export interface IHappeningModel extends Document, HappeningDb {
}

const HappeningSchema: Schema = new Schema({
    date: Date,
    location: Schema.Types.Mixed,
    creator: String,
    categories: [String],
    secondCategories: [String],
    contents: [String],
    description: String,
    subscribers: [String],
    title: String
}, {timestamps: true});


export const Happening: Model<IHappeningModel> = model<IHappeningModel>("Happening", HappeningSchema);