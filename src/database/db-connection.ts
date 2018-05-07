import * as mongoose from 'mongoose';
import * as config from "../config/config.json";
import {NextFunction, Request, Response} from "express";


class DbConnection {

    public static dbStatus: string;

    public connect(): void {
        const options = {
            useMongoClient: true,
            autoReconnect: true,
            reconnectInterval: 1000,
            keepAlive: 1500,
            reconnectTries: Number.MAX_VALUE
        };
        mongoose.connect('mongodb://' + (<any>config).database.dbUser + ':' + (<any>config).database.dbPassword + '@' + (<any>config).database.dbServer + '/' + (<any>config).database.dbName, options);
    }

    public errorHandler(): void {
        mongoose.connection.on('error', () => {
            console.log('Server is unreachable.');
        });
        mongoose.connection.on('disconnected', () => {
            DbConnection.dbStatus = 'disconnected';
            console.log('MongoDB disconnected');
        });
        mongoose.connection.on("reconnected", () => {
            console.log("Reconnected to MongoDB");
        });
        mongoose.connection.on('connected', () => {
            DbConnection.dbStatus = 'connected';
            console.log('MongoDB connected.');
        });
        mongoose.connection.once('open', () => {
            console.log('MongoDB connection opened.');
        });
    }

    public checkDBConnection(req: Request, res: Response, next: NextFunction) {
        if (DbConnection.dbStatus === 'disconnected' ) {
            return res.status(500).json({message: "MongoDB is disconnected"});
        }
        return next();
    }
}

export default new DbConnection();