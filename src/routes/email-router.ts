import {Router, Request, Response, NextFunction} from 'express';
import * as Mailjet from "node-mailjet";
import * as fs from "fs";
import * as config from "../config/config.json";

export class EmailRouter {

    public static sendCreateEmail(req: Request, res: Response, next: NextFunction) {

        const emails = res.locals.emails;

        const config = JSON.parse(fs.readFileSync('./dist/config/config.json', 'utf8'));

        const mailjet = Mailjet.connect(config.email.conf.username, config.email.conf.password);


        let message = {
            'FromEmail': 'plutzerf@hotmail.com',
            'FromName': config.email.newEmail.fromName,
            'Subject': config.email.newEmail.subject,
            'Text-part': config.email.newEmail.text,
            'Recipients': emails,
        };

        mailjet
            .post("send")
            .request(message)
            .then((response: any) => {
                return res.status(200).json(res.locals.happeningDTO);
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(500).json({message: "Error during email sending"});
            });
    }

    public static sendUpdateEmail(req: Request, res: Response, next: NextFunction) {

        const emails = res.locals.emails;

        const config = JSON.parse(fs.readFileSync('./dist/config/config.json', 'utf8'));

        console.log(config.email.conf.username, config.email.conf.password);

        const mailjet = Mailjet.connect(config.email.conf.username, config.email.conf.password);


        let message = {
            'FromEmail': 'plutzerf@hotmail.com',
            'FromName': config.email.updateEmail.fromName,
            'Subject': config.email.updateEmail.subject,
            'Text-part': config.email.updateEmail.text,
            'Recipients': emails,
        };

        mailjet
            .post("send")
            .request(message)
            .then((response: any) => {
                return res.status(200).json();
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(500).json({message: "Error during email sending"});
            });
    }

}