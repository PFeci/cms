import {Router, Request, Response, NextFunction} from 'express';
import * as Mailjet from "node-mailjet";

export class EmailRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * POST send an Email
     */
    public sendEmail(req: Request, res: Response, next: NextFunction) {

        const mailjet = Mailjet.connect('a5a93293af249871ed1ffee1483536c2', '2766929e885bb69d55fff4a0b04cf78b');

        let message = {
            'FromEmail': 'info@cms.com',
            'FromName': 'CMS System',
            'Subject': 'New event created you might interested in',
            'Text-part': 'Hello world!',
            'Recipients': [{'Email': 'fplutzer@gmail.com'}],
        };

        mailjet
            .post("send")
            .request(message)
            .then((response: any) => {
                console.log(response);
                return res.status(200).json();
            })
            .catch((err: any) => {
                console.log(err);
                return res.status(500).json({message: "Error during email sending"});
            });
    }


    init() {
        this.router.post('/send', this.sendEmail);
    }
}