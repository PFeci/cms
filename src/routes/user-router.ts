import {Router, Request, Response, NextFunction} from 'express';
import {IUserModel, User} from "../database/schemas/user-schema";
import {UserDTO} from "../dtos/user-dto";
import {Role} from "../enums/role";
import {AuthGuard} from "./auth-guard";
import {CategoryDTO} from "../dtos/category-dto";
import {HappeningRouter} from "./happening-router";
import {Happening, IHappeningModel} from "../database/schemas/happening-schema";
import {CategoryRouter} from "./category-router";
import {Category, ICategoryModel} from "../database/schemas/category-schema";
import {HappeningDTO} from "../dtos/happening-dto";

export class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static async createUserDTO(userModel: IUserModel): Promise<UserDTO> {
        let categoryDTOs: CategoryDTO[] = [];
        await UserRouter.getCategories(userModel)
            .then(categories => {
                categoryDTOs = categories
            });
        let happeningDTOs: HappeningDTO[] = [];
        await UserRouter.getHappenings(userModel)
            .then(happenings => {
                happeningDTOs = happenings
            });
        const userDTO: UserDTO = {
            id: userModel._id,
            email: userModel.email,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            role: userModel.role,
            interestedCategories: categoryDTOs,
            happenings: happeningDTOs
        };
        return userDTO;
    }

    public static createModelFromDTO(dto: UserDTO): IUserModel {
        let model: IUserModel = <IUserModel>{};
        model._id = dto.id;
        model.email = dto.email;
        model.lastName = dto.lastName;
        model.firstName = dto.firstName;
        model.role = dto.role;
        model.interestedCategories = [];
        model.happenings = [];
        dto.interestedCategories.forEach((category) => {
            model.interestedCategories.push(category.id);
        });
        dto.happenings.forEach((happening) => {
            model.happenings.push(happening.id);
        });
        return model;
    }

    /**
     * PUT update a User
     */
    public update(req: Request, res: Response, next: NextFunction) {
        const userModel: IUserModel = UserRouter.createModelFromDTO(req.body);
        User.findOneAndUpdate({email: userModel.email}, {
            $set: {
                interestedCategories: userModel.interestedCategories,
                firstName: userModel.firstName,
                lastName: userModel.lastName
            }
        }, {upsert: true, new: true}).exec()
            .then((userModel: IUserModel) => {
                return UserRouter.createUserDTO(userModel);
            })
            .then((userDTO: UserDTO) => {
                return res.status(200).json(userDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            });
    }

    /**
     * GET all User
     */
    public getAll(req: Request, res: Response, next: NextFunction) {

        User.find().exec()
            .then(async (users: IUserModel[]) => {
                const userDTOs: UserDTO[] = [];
                await Promise.all(users.map(async (user) => {
                    await UserRouter.createUserDTO(user)
                        .then((userDTO: UserDTO) => {
                            userDTOs.push(userDTO);
                        });
                }));
                return res.status(200).json(userDTOs);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * GET one User by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {

        const userId = req.params.id;
        User.findOne({_id: userId}).exec()
            .then((user: IUserModel) => {
                if (!user) {
                    return res.status(404).json();
                }
                UserRouter.createUserDTO(user)
                    .then((userDTO: UserDTO) => {
                        return res.status(200).json(userDTO);
                    })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    init() {
        this.router.get('/all', AuthGuard.verifyAdmin, this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.put('/', this.update);
    }

    public static async getCategories(userModel: IUserModel): Promise<CategoryDTO[]> {
        const categoryDTOs: CategoryDTO[] = [];
        await Promise.all(userModel.interestedCategories.map(async (categoryId: string) => {
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

    public static async getHappenings(userModel: IUserModel): Promise<HappeningDTO[]> {
        const happeningDTOs: HappeningDTO[] = [];
        await Promise.all(userModel.interestedCategories.map(async (happeningId: string) => {
            await Happening.findOne({_id: happeningId}).exec()
                .then((happening: IHappeningModel) => {
                    HappeningRouter.createHappeningDTO(happening).then((happeningDTO) => {
                        happeningDTOs.push(happeningDTO);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }));
        return happeningDTOs;
    }
}