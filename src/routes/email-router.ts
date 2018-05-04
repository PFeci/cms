import {Router, Request, Response, NextFunction} from 'express';
import * as Mailjet from "node-mailjet";

export class EmailRouter {

    /**
     * POST send an Email
     */
    public static sendEmail(req: Request, res: Response, next: NextFunction) {

        const emails = res.locals.emails;

        const mailjet = Mailjet.connect('a5a93293af249871ed1ffee1483536c2', '0de09d55d12060ae83529f0588da1d71');

        let message = {
            'FromEmail': 'plutzerf@hotmail.com',
            'FromName': 'CMS System',
            'Subject': 'New event created you might interested in',
            'Text-part': 'Hello world!',
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