///<reference path="routes/outside-router.ts"/>
import {Request, Response, NextFunction, Application} from 'express';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import DbConnection from './database/db-connection'
import {OutsideRouter} from "./routes/outside-router";
import {AuthGuard} from "./routes/auth-guard";
import {UserRouter} from "./routes/user-router";
import {HappeningRouter} from "./routes/happening-router";
import {CategoryRouter} from "./routes/category-router";

// Creates and configures an ExpressJS web server.
export class App {

    public express: Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.express.use('/', express.static(path.join(__dirname, '../frontend/dist')));
        this.middleware();
        this.routes();
        // this.cloudinaryConfig();

        DbConnection.connect();
        DbConnection.errorHandler();

    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cors());
    }

    // Configure API endpoints.
    private routes(): void {

        this.express.use('/api/auth', new OutsideRouter().router);
        this.express.use('/api/happening', new HappeningRouter().router);
        this.express.use('/api/category', new CategoryRouter().router);
        this.express.all('/api/*', AuthGuard.verifyToken);
        this.express.use('/api/user', new UserRouter().router);


        this.express.use('*', (req: Request, res: Response, next: NextFunction) => {
            res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
        });
    }

    // private cloudinaryConfig(): void {
    //     cloudinary.config({
    //         cloud_name: 'dj5hg3jvo',
    //         api_key: '465423256943594',
    //         api_secret: '7QHalxaRHtG4oU-KGfr5X7-ztfc'
    //     });
    //
    //
    // }

}

export default new App().express;