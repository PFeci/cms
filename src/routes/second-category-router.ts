import {Router, Request, Response, NextFunction} from 'express';
import {AuthGuard} from "./auth-guard";
import {SecondCategoryDTO} from "../dtos/second-category-dto";
import {ISecondCategoryModel, SecondCategory} from "../database/schemas/second-category-schema";

export class SecondCategoryRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static createSecondCategoryDTO(secondCategoryModel: ISecondCategoryModel): SecondCategoryDTO {
        const secondCategoryDTO: SecondCategoryDTO = {
            id: secondCategoryModel._id,
            name: secondCategoryModel.name
        };
        return secondCategoryDTO;
    }

    /**
     * POST save a SecondCategory
     */
    public save(req: Request, res: Response, next: NextFunction) {
        const SecondCategoryDTO = req.body;
        new SecondCategory(SecondCategoryDTO).save()
            .then((secondCategoryModel: ISecondCategoryModel) => {
                const secondCategoryDTO: SecondCategoryDTO = SecondCategoryRouter.createSecondCategoryDTO(secondCategoryModel);
                return res.status(200).json(secondCategoryDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * PUT update a SecondCategory
     */
    public update(req: Request, res: Response, next: NextFunction) {
        const secondCategoryDTO: SecondCategoryDTO = req.body;
        SecondCategory.findOneAndUpdate({_id: secondCategoryDTO.id}, secondCategoryDTO, {upsert: true, new: true}).exec()
            .then((secondCategoryModel: ISecondCategoryModel) => {
                const secondCategoryDTO = SecondCategoryRouter.createSecondCategoryDTO(secondCategoryModel);
                return res.status(200).json(secondCategoryDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            });
    }

    /**
     * GET all SecondCategories
     */
    public getAll(req: Request, res: Response, next: NextFunction) {

        SecondCategory.find().exec()
            .then((secondCategories: ISecondCategoryModel[]) => {
                const secondCategoryDTOs: SecondCategoryDTO[] = [];
                secondCategories.forEach(secondCategory => {
                    const secondCategoryDTO: SecondCategoryDTO = SecondCategoryRouter.createSecondCategoryDTO(secondCategory);
                    secondCategoryDTOs.push(secondCategoryDTO);
                });
                return res.status(200).json(secondCategoryDTOs);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * GET one SecondCategory by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {

        const secondCategoryId = req.params.id;
        SecondCategory.findOne({_id: secondCategoryId}).exec()
            .then((secondCategory: ISecondCategoryModel) => {
                if (!secondCategory) {
                    return res.status(404).json();
                }
                const secondCategoryDTO: SecondCategoryDTO = SecondCategoryRouter.createSecondCategoryDTO(secondCategory);
                return res.status(200).json(secondCategoryDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * DELETE one SecondCategory by id
     */
    public delete(req: Request, res: Response, next: NextFunction) {

        const secondCategoryId = req.params.id;
        SecondCategory.findOneAndRemove({_id: secondCategoryId})
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
        this.router.delete('/:id', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.delete);
        this.router.put('/', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.update);
        this.router.post('/', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.save);
    }
}