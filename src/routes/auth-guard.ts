import {Router, Request, Response, NextFunction} from 'express';
import * as jwt from "jsonwebtoken"
import {Config} from "../config";

export class AuthGuard {


    public static verifyToken(req: Request, res: Response, next: NextFunction) {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, Config.secret, function (err: Error, decoded: string) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    next();
                }
            });
        } else {
            return res.status(403).json({message: 'No token provided.'});
        }
    }
}