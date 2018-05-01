import {Router, Request, Response, NextFunction} from 'express';
import {AuthGuard} from "./auth-guard";
import {IContentModel, Content} from "../database/schemas/content-schema";
import {ContentDTO} from "../dtos/content-dto";
import {CategoryRouter} from "./category-router";

export class ContentRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static createContentDTO(contentModel: IContentModel): ContentDTO {
        const contentDTO: ContentDTO = {
            id: contentModel._id,
            title: contentModel.title
        };
        return contentDTO;
    }

    /**
     * POST save a Content
     */
    public save(req: Request, res: Response, next: NextFunction) {
        const contentDTO = req.body;
        new Content(contentDTO).save()
            .then((contentModel: IContentModel) => {
                const contentDTO: ContentDTO = ContentRouter.createContentDTO(contentModel);
                return res.status(200).json(contentDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * PUT update a Content
     */
    public update(req: Request, res: Response, next: NextFunction) {
        const contentDTO: ContentDTO = req.body;
        Content.findOneAndUpdate({_id: contentDTO.id}, contentDTO, {upsert: true, new: true}).exec()
            .then((contentModel: IContentModel) => {
                const contentDTO = ContentRouter.createContentDTO(contentModel);
                return res.status(200).json(contentDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            });
    }

    /**
     * GET all Contents
     */
    public getAll(req: Request, res: Response, next: NextFunction) {

        Content.find().exec()
            .then((contents: IContentModel[]) => {
                const contentDTOs: ContentDTO[] = [];
                contents.forEach(category => {
                    const contentDTO: ContentDTO = ContentRouter.createContentDTO(category);
                    contentDTOs.push(contentDTO);
                });
                return res.status(200).json(contentDTOs);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * GET one Content by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {

        const contentId = req.params.id;
        Content.findOne({_id: contentId}).exec()
            .then((content: IContentModel) => {
                if (!content) {
                    return res.status(404).json();
                }
                const contentDTO: ContentDTO = ContentRouter.createContentDTO(content);
                return res.status(200).json(contentDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * DELETE one Content by id
     */
    public delete(req: Request, res: Response, next: NextFunction) {

        const contentId = req.params.id;
        Content.findOneAndRemove({_id: contentId})
            .then(() => {
                return res.status(200).json();
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    init() {
        this.router.get('/all', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.delete('/:id', AuthGuard.verifyAdmin, this.delete);
        this.router.put('/',  AuthGuard.verifyAdmin, this.update);
        this.router.post('/', this.save);
    }
}