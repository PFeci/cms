import {Router, Request, Response, NextFunction} from 'express';
import {IUserModel, User} from "../database/schemas/user-schema";
import {UserDTO} from "../dtos/user-dto";
import {AuthGuard} from "./auth-guard";
import {HappeningDTO} from "../dtos/happening-dto";
import {IHappeningModel, Happening} from "../database/schemas/happening-schema";
import {CategoryDTO} from "../dtos/category-dto";
import {Category, ICategoryModel} from "../database/schemas/category-schema";
import {CategoryRouter} from "./category-router";
import {SecondCategoryDTO} from "../dtos/second-category-dto";
import {ISecondCategoryModel, SecondCategory} from "../database/schemas/second-category-schema";
import {SecondCategoryRouter} from "./second-category-router";
import {ContentDTO} from "../dtos/content-dto";
import {Content, IContentModel} from "../database/schemas/content-schema";
import {ContentRouter} from "./content-router";
import {EmailRouter} from "./email-router";

export class HappeningRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }


    public static async createHappeningDTO(happeningModel: IHappeningModel): Promise<HappeningDTO> {
        let categoryDTOs: CategoryDTO[] = [];
        await HappeningRouter.getCategories(happeningModel)
            .then(categories => {
                categoryDTOs = categories
            });
        let secondCategoryDTOs: SecondCategoryDTO[] = [];
        await HappeningRouter.getSecondCategories(happeningModel)
            .then(secondCategories => {
                secondCategoryDTOs = secondCategories
            });
        let contentDTOs: ContentDTO[] = [];
        await HappeningRouter.getContents(happeningModel)
            .then(contents => {
                contentDTOs = contents
            });

        const happeningDTO: HappeningDTO = {
            id: happeningModel._id,
            location: happeningModel.location,
            startDate: happeningModel.startDate,
            endDate: happeningModel.endDate,
            creator: happeningModel.creator,
            description: happeningModel.description,
            title: happeningModel.title,
            categories: categoryDTOs,
            secondCategories: secondCategoryDTOs,
            contents: contentDTOs
        };
        return happeningDTO;
    }

    public static createModelFromDTO(dto: HappeningDTO): IHappeningModel {
        let model: IHappeningModel = <IHappeningModel>{};
        model._id = dto.id;
        model.location = dto.location;
        model.startDate = dto.startDate;
        model.endDate = dto.endDate;
        model.description = dto.description;
        model.title = dto.title;
        model.categories = [];
        model.secondCategories = [];
        model.contents = [];
        dto.categories.forEach((category) => {
            model.categories.push(category.id);
        });
        dto.secondCategories.forEach((secondCategory) => {
            model.secondCategories.push(secondCategory.id);
        });
        dto.contents.forEach((content) => {
            model.contents.push(content.id);
        });
        return model;
    }

    /**
     * POST save a Happening
     */
    public save(req: Request, res: Response, next: NextFunction) {
        const happeningModel: IHappeningModel = HappeningRouter.createModelFromDTO(req.body);

        new Happening(happeningModel).save()
            .then((happeningModel: IHappeningModel) => {
                res.locals.happeningModel = happeningModel;

                return User.findOneAndUpdate({email: res.locals.user.email}, {
                    $push: {
                        madeByMe: happeningModel._id
                    }
                }).exec()
            })
            .then(() => {
                return next();
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }


    /**
     * PUT update a Happening
     */
    public update(req: Request, res: Response, next: NextFunction) {
        const happeningModel: IHappeningModel = HappeningRouter.createModelFromDTO(req.body);

        Happening.findOneAndUpdate({_id: happeningModel._id},
            {
                $set: {
                    location: happeningModel.location,
                    startDate: happeningModel.startDate,
                    endDate: happeningModel.endDate,
                    description: happeningModel.description,
                    secondCategories: happeningModel.secondCategories,
                    contents: happeningModel.contents,
                    categories: happeningModel.categories,
                }
            }, {upsert: true, new: true}).exec()
            .then((happeningModel: IHappeningModel) => {
                res.locals.happeningModel = happeningModel;
                return next();
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            });
    }

    /**
     * GET all Happenings
     */
    public getAll(req: Request, res: Response, next: NextFunction) {

        Happening.find().exec()
            .then(async (happenings: IHappeningModel[]) => {
                const happeningDTOs: HappeningDTO[] = [];
                await Promise.all(happenings.map(async (happening) => {
                    await HappeningRouter.createHappeningDTO(happening)
                        .then((happeningDTO) => {
                            happeningDTOs.push(happeningDTO);
                        });
                }));
                return res.status(200).json(happeningDTOs);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * GET one Happening by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {

        const happeningId = req.params.id;
        Happening.findOne({_id: happeningId}).exec()
            .then((happening: IHappeningModel) => {
                if (!happening) {
                    return res.status(404).json();
                }
                HappeningRouter.createHappeningDTO(happening)
                    .then((happeningDTO: HappeningDTO) => {
                        return res.status(200).json(happeningDTO);
                    })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * DELETE one Happening by id
     */
    public delete(req: Request, res: Response, next: NextFunction) {

        const happeningId = req.params.id;
        Happening.findOneAndRemove({_id: happeningId})
            .then(() => {
                return User.update({},{
                    $pull: {
                        madeByMe: happeningId,
                        happenings: happeningId
                    }
                } ).exec();
            })
            .then(() => {
                return res.status(200).json();
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    public subscribeToHappening(req: Request, res: Response, next: NextFunction) {
        const happeningId: string = req.body.happeningId;
        const userId: string = req.body.userId;
        User.findOneAndUpdate({_id: userId}, {
            $push: {
                happenings: happeningId
            }
        }).exec()
            .then(() => {
                return Happening.findOneAndUpdate({_id: happeningId},
                    {
                        $push: {
                            subscribers: userId
                        }
                    }, {upsert: true, new: true}).exec()
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
            });

    }

    public unSubscribeFromHappening(req: Request, res: Response, next: NextFunction) {
        const happeningId: string = req.body.happeningId;
        const userId: string = req.body.userId;
        User.findOneAndUpdate({_id: userId}, {
            $pull: {
                happenings: happeningId
            }
        }).exec()
            .then(() => {
                return Happening.findOneAndUpdate({_id: happeningId},
                    {
                        $pull: {
                            subscribers: userId
                        }
                    }, {upsert: true, new: true}).exec()
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
            });

    }

    public getEmailsOnUpdate(req: Request, res: Response, next: NextFunction) {

        User.find({_id: {$in: res.locals.happeningModel.subscribers}}, {_id: 0, email: 1}).exec()
            .then((emails: IUserModel[]) => {
                //no need to send emails
                if (emails.length === 0) {
                    return res.status(200).json();
                }
                res.locals.emails = emails;
                return next();
            });
    }

    public getEmailsOnCreation(req: Request, res: Response, next: NextFunction) {

        User.find({interestedCategories: {$in: res.locals.happeningModel.categories}}, {_id: 0, email: 1}).exec()
            .then((emails: IUserModel[]) => {
                //no need to send emails
                if (emails.length === 0) {
                    return res.status(200).json();
                }
                res.locals.emails = emails;
                return next();
            });
    }


    init() {
        this.router.get('/all', this.getAll);
        this.router.get('/:id', AuthGuard.verifyToken, this.getOne);
        this.router.put('/', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.update, this.getEmailsOnUpdate, EmailRouter.sendUpdateEmail);
        this.router.post('/', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.save, this.getEmailsOnCreation, EmailRouter.sendCreateEmail);
        this.router.post('/subscribe', AuthGuard.verifyToken, this.subscribeToHappening);
        this.router.post('/unsubscribe', AuthGuard.verifyToken, this.unSubscribeFromHappening);
        this.router.delete('/:id', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.delete);
    }


    public static async getCategories(happeningModel: IHappeningModel): Promise<CategoryDTO[]> {
        const categoryDTOs: CategoryDTO[] = [];
        await Promise.all(happeningModel.categories.map(async (categoryId: string) => {
            await Category.findOne({_id: categoryId}).exec()
                .then((category: ICategoryModel) => {
                    categoryDTOs.push(CategoryRouter.createCategoryDTO(category));
                })
                .catch((err) => {
                    console.log(err);
                });
        }));
        return categoryDTOs;
    }

    public static async getSecondCategories(happeningModel: IHappeningModel): Promise<SecondCategoryDTO[]> {
        const secondCategoryDTOs: SecondCategoryDTO[] = [];
        await Promise.all(happeningModel.secondCategories.map(async (secondCategoryId: string) => {
            await SecondCategory.findOne({_id: secondCategoryId}).exec()
                .then((secondCategory: ISecondCategoryModel) => {
                    secondCategoryDTOs.push(SecondCategoryRouter.createSecondCategoryDTO(secondCategory));
                })
                .catch((err) => {
                    console.log(err);
                });
        }));
        return secondCategoryDTOs;
    }

    public static async getContents(happeningModel: IHappeningModel): Promise<ContentDTO[]> {
        const contentDTOs: ContentDTO[] = [];
        await Promise.all(happeningModel.contents.map(async (contentId: string) => {
            await Content.findOne({_id: contentId}).exec()
                .then((content: IContentModel) => {
                    contentDTOs.push(ContentRouter.createContentDTO(content));
                })
                .catch((err) => {
                    console.log(err);
                });
        }));
        return contentDTOs;
    }
}