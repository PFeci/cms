import {Router, Request, Response, NextFunction} from 'express';
import {AuthRouter} from "./auth-router";
import {CategoryDTO} from "../dtos/category-dto";
import {ICategoryModel, Category} from "../database/schemas/category-schema";
import {User} from "../database/schemas/user-schema";
import {Happening} from "../database/schemas/happening-schema";

export class CategoryRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static createCategoryDTO(categoryModel: ICategoryModel): CategoryDTO {
        const categoryDTO: CategoryDTO = {
            id: categoryModel._id,
            name: categoryModel.name
        };
        return categoryDTO;
    }

    /**
     * POST save a Category
     */
    public save(req: Request, res: Response, next: NextFunction) {
        const categoryDTO = req.body;
        new Category(categoryDTO).save()
            .then((categoryModel: ICategoryModel) => {
                const categoryDTO: CategoryDTO = CategoryRouter.createCategoryDTO(categoryModel);
                return res.status(200).json(categoryDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * PUT update a Category
     */
    public update(req: Request, res: Response, next: NextFunction) {
        const categoryDTO: CategoryDTO = req.body;
        Category.findOneAndUpdate({_id: categoryDTO.id}, categoryDTO, {upsert: true, new: true}).exec()
            .then((categoryModel: ICategoryModel) => {
                const categoryDTO = CategoryRouter.createCategoryDTO(categoryModel);
                return res.status(200).json(categoryDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            });
    }

    /**
     * GET all Categories
     */
    public getAll(req: Request, res: Response, next: NextFunction) {

        Category.find().exec()
            .then((categories: ICategoryModel[]) => {
                const categoryDTOs: CategoryDTO[] = [];
                categories.forEach(category => {
                    const categoryDTO: CategoryDTO = CategoryRouter.createCategoryDTO(category);
                    categoryDTOs.push(categoryDTO);
                });
                return res.status(200).json(categoryDTOs);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * GET one Category by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {

        const categoryId = req.params.id;
        Category.findOne({_id: categoryId}).exec()
            .then((category: ICategoryModel) => {
                if (!category) {
                    return res.status(404).json();
                }
                const categoryDTO: CategoryDTO = CategoryRouter.createCategoryDTO(category);
                return res.status(200).json(categoryDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * DELETE one Category by id
     */
    public delete(req: Request, res: Response, next: NextFunction) {

        const categoryId = req.params.id;
        Category.findOneAndRemove({_id: categoryId})
            .then(() => {
                return User.update({}, {
                    $pull: {
                        interestedCategories: categoryId
                    }
                }).exec();
            })
            .then(() => {
                return Happening.update({},{
                    $pull: {
                        categories: categoryId
                    }
                }).exec();
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
        this.router.get('/all', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.delete('/:id', AuthRouter.verifyToken, AuthRouter.verifyAdmin, this.delete);
        this.router.put('/', AuthRouter.verifyToken, AuthRouter.verifyAdmin, this.update);
        this.router.post('/', AuthRouter.verifyToken, AuthRouter.verifyAdmin, this.save);
    }
}