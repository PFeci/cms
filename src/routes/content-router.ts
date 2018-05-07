import {Router, Request, Response, NextFunction} from 'express';
import {IContentModel, Content} from "../database/schemas/content-schema";
import {ContentDTO} from "../dtos/content-dto";
import * as multer from "multer";
import * as Datauri from 'datauri';
import * as cloudinary from 'cloudinary';
import {Happening, IHappeningModel} from "../database/schemas/happening-schema";
import {HappeningDTO} from "../dtos/happening-dto";
import {HappeningRouter} from "./happening-router";

const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single('file');

export class ContentRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static createContentDTO(contentModel: IContentModel): ContentDTO {
        const contentDTO: ContentDTO = {
            id: contentModel._id,
            src: contentModel.src
        };
        return contentDTO;
    }


    /**
     * PUT upload Content to cloudinary
     */
    public uploadContent(req: Request, res: Response, next: NextFunction) {

        const happeningId = req.params.happeningId;

        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({message: err});
            }
            const uri = new Datauri();
            uri.format('.png', req['file'].buffer);

            cloudinary.v2.uploader.upload(uri.content, {use_filename: true},
                (err: any, result: any) => {
                    if (err) {
                        return res.status(500).json({message: err});
                    }
                    const contentDTO = <ContentDTO>{
                        src: result.secure_url
                    };
                    new Content(contentDTO).save()
                        .then((contentModel: IContentModel) => {
                            return Happening.findOneAndUpdate({_id: happeningId}, {
                                $push: {
                                    contents: contentModel._id
                                }
                            },{new: true}).exec();
                        })
                        .then((happeningModel: IHappeningModel) => {
                            return HappeningRouter.createHappeningDTO(happeningModel);
                        })
                        .then((happeningDTO: HappeningDTO) => {
                            return res.status(200).json(happeningDTO);
                        })
                        .catch((err) => {
                            console.log(err);
                            return res.status(500).json({message: err});
                        })

                });
        });
    }


    /**
     * DELETE one Content by id
     */
    public delete(req: Request, res: Response, next: NextFunction) {

        const contentId = req.params.id;
        Content.findOneAndRemove({_id: contentId})
            .then(() => {
                return Happening.update({}, {
                    $pull: {
                        contents: contentId
                    }
                },{multi: true}).exec();
            })
            .then(() => {
                return res.status(200).json();
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    init() {
        this.router.put('/:happeningId', this.uploadContent);
        this.router.delete('/:contentId', this.delete);
    }
}