import {Router, Request, Response, NextFunction} from 'express';
import * as config from "../config/config.json";
import * as fs from "fs";
import {AuthGuard} from "./auth-guard";
import DbConnection from './../database/db-connection'


export class SettingRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getDatabase (req: Request, res: Response, next: NextFunction) {
        return res.status(200).json((<any>config).database);
    }


    /**
     * PUT change updateDatabase settings
     */
    public updateDatabase(req: Request, res: Response, next: NextFunction) {

        (<any>config).database = req.body;
        fs.writeFileSync('./dist/config/config.json', JSON.stringify(config), 'utf8');

        const configString = fs.readFileSync('./src/config/config.json', 'utf8');
        const configObject = JSON.parse(configString);
        configObject.database = (<any>config).database;
        fs.writeFileSync('./src/config/config.json', JSON.stringify(configObject), 'utf8');
        DbConnection.connect();
        DbConnection.errorHandler();

        return res.status(200).json();
    }


    init() {
        this.router.get('/database',this.getDatabase);
        this.router.put('/database',this.updateDatabase);
    }
}