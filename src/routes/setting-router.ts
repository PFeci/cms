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

            return res.status(200).json();
        }
        catch (err) {
            return res.status(500).json({message: 'Unable to update database settings'})
        }

    }

    public updateNewEmail(req: Request, res: Response, next: NextFunction) {

        try {
            (<any>config).email.newEvent = req.body;
            fs.writeFileSync('./dist/config/config.json', JSON.stringify(config), 'utf8');

            const configString = fs.readFileSync('./src/config/config.json', 'utf8');
            const configObject = JSON.parse(configString);
            configObject.email.newEvent = (<any>config).email.newEvent;
            fs.writeFileSync('./src/config/config.json', JSON.stringify(configObject), 'utf8');
        }
        catch (err) {
            return res.status(500).json({message: 'Unable to update email settings'})
        }
    }

    public getNewEmail(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json((<any>config).email.newEvent);
    }

    public updateUpdateEmail(req: Request, res: Response, next: NextFunction) {

        try {
            (<any>config).email.updateEvent = req.body;
            fs.writeFileSync('./dist/config/config.json', JSON.stringify(config), 'utf8');

            const configString = fs.readFileSync('./src/config/config.json', 'utf8');
            const configObject = JSON.parse(configString);
            configObject.email.updateEvent = (<any>config).email.updateEvent;
            fs.writeFileSync('./src/config/config.json', JSON.stringify(configObject), 'utf8');
        }
        catch (err) {
            return res.status(500).json({message: 'Unable to update email settings'})
        }
    }

    public getUpdateEmail(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json((<any>config).email.newEvent);
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