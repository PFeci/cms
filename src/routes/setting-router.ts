import {Router, Request, Response, NextFunction} from 'express';
import * as config from "../config/config.json";
import * as fs from "fs";
import {AuthRouter} from "./auth-router";
import DbConnection from './../database/db-connection'


export class SettingRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getDatabase(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json((<any>config).database);
    }


    public updateDatabase(req: Request, res: Response, next: NextFunction) {

        try {
            (<any>config).database = req.body;
            fs.writeFileSync('./dist/config/config.json', JSON.stringify(config), 'utf8');

            const configString = fs.readFileSync('./src/config/config.json', 'utf8');
            const configObject = JSON.parse(configString);
            configObject.database = (<any>config).database;
            fs.writeFileSync('./src/config/config.json', JSON.stringify(configObject), 'utf8');
            DbConnection.connect();
            DbConnection.errorHandler();

            return res.status(200).json((<any>config).database);
        }
        catch (err) {
            return res.status(500).json({message: 'Unable to update database settings'})
        }

    }

    public updateNewEmail(req: Request, res: Response, next: NextFunction) {

        try {
            (<any>config).email.newEmail = req.body;
            fs.writeFileSync('./dist/config/config.json', JSON.stringify(config), 'utf8');

            const configString = fs.readFileSync('./src/config/config.json', 'utf8');
            const configObject = JSON.parse(configString);
            configObject.email.newEmail = (<any>config).email.newEmail;
            fs.writeFileSync('./src/config/config.json', JSON.stringify(configObject), 'utf8');

            return res.status(200).json((<any>config).email.newEmail);
        }
        catch (err) {
            return res.status(500).json({message: 'Unable to update email settings'})
        }
    }

    public getNewEmail(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json((<any>config).email.newEmail);
    }

    public updateUpdateEmail(req: Request, res: Response, next: NextFunction) {

        try {
            (<any>config).email.updateEmail = req.body;
            fs.writeFileSync('./dist/config/config.json', JSON.stringify(config), 'utf8');

            const configString = fs.readFileSync('./src/config/config.json', 'utf8');
            const configObject = JSON.parse(configString);
            configObject.email.updateEmail = (<any>config).email.updateEmail;
            fs.writeFileSync('./src/config/config.json', JSON.stringify(configObject), 'utf8');

            return res.status(200).json((<any>config).email.updateEmail);
        }
        catch (err) {
            return res.status(500).json({message: 'Unable to update email settings'})
        }
    }

    public getUpdateEmail(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json((<any>config).email.updateEmail);
    }


    init() {
        this.router.get('/database', this.getDatabase);
        this.router.put('/database', this.updateDatabase);
        this.router.get('/email/new', this.getNewEmail);
        this.router.put('/email/new', this.updateNewEmail);
        this.router.get('/email/update', this.getUpdateEmail);
        this.router.put('/email/update', this.updateUpdateEmail);
    }
}