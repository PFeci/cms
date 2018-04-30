import {Router, Request, Response, NextFunction} from 'express';
import * as jwt from "jsonwebtoken"
import {Config} from "../config";
import {Role} from "../enums/role";

export class AuthGuard {


    public static verifyToken(req: Request, res: Response, next: NextFunction) {

        let token = req.body.token || req.query.token || req.headers['authorization'];
        //cut 'Bearer" from the beginning of the token
        token = token.slice(7, token.length);
        if (token) {
            jwt.verify(token, Config.secret, (err: Error, decoded: string) => {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                }
                res.locals.user = decoded;
            });
            return next();
        }
        return res.status(403).json({message: 'No token provided.'});
    }

    public static verifyUserRole(req: Request, res: Response, next: NextFunction) {

        if (res.locals.user.role === Role.ADMIN || res.locals.user.email === req.body.email) {
            return next();
        }
        return res.status(403).json({message: 'Do not have privilige'});
    }
}