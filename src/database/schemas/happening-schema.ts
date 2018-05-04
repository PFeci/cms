import {Document, Schema, Model, model,} from "mongoose";
import {HappeningDb} from "../interfaces/happening-db";

export interface IHappeningModel extends Document, HappeningDb {
}

const HappeningSchema: Schema = new Schema({
    date: Date,
    location: Schema.Types.Mixed,
    creator: String,
    categories: Schema.Types.Array,
    secondCategories: Schema.Types.Array,
    contents: Schema.Types.Array,
    description: String,
    subscribers: Schema.Types.Array
}, {timestamps: true});


export const Happening: Model<IHappeningModel> = model<IHappeningModel>("Happening", HappeningSchema);