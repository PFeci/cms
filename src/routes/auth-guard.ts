import {Router, Request, Response, NextFunction} from 'express';
import * as jwt from "jsonwebtoken"
import {Role} from "../enums/role";
import * as config from "../config/config.json";


export class AuthGuard {


    public static verifyToken(req: Request, res: Response, next: NextFunction) {

        let token = req.body.token || req.query.token || req.headers['authorization'];
        if (token) {
            //cut 'Bearer" from the beginning of the token
            token = token.slice(7, token.length);
            try {
                res.locals.user = jwt.verify(token, (<any>config).jwt.secret);
                return next();
            } catch(err) {
                // err
            }
        }
        return res.status(403).json({message: 'Bad token.'});
    }

    public static verifyAdmin(req: Request, res: Response, next: NextFunction) {

        if (res.locals.user.role === Role.ADMIN) {
            return next();
        }
        return res.status(403).json({message: 'Do not have privilige'});
    }

    public static verifySupporter(req: Request, res: Response, next: NextFunction) {

        if (res.locals.user.role === Role.ADMIN || res.locals.user.role === Role.SUPPORTER) {
            return next();
        }
        return res.status(403).json({message: 'Do not have privilige'});
    }
}