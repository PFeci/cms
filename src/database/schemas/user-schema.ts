import {Document, Schema, Model, model,} from "mongoose";
import {UserDb} from "../interfaces/user-db";

export interface IUserModel extends Document, UserDb {
}

const UserSchema: Schema = new Schema({
        email: String,
        password: String,
        passwordConf: String,
        firstName: String,
        lastName: String,
        role: Schema.Types.Mixed
    },{timestamps: true});


export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);