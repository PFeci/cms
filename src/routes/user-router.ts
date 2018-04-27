import {Router, Request, Response, NextFunction} from 'express';
import {IUserModel, User} from "../database/schemas/user-schema";
import {UserDTO} from "../dtos/user-dto";

export class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static createUserDTO(userModel: IUserModel): UserDTO {
        const userDTO: UserDTO = {
            id: userModel._id,
            email: userModel.email,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
        };
        return userDTO;
    }

    /**
     * PUT update a User
     */
    public update(req: Request, res: Response, next: NextFunction) {
        const userDTO: UserDTO = req.body;
        User.findOneAndUpdate({email: userDTO.email}, userDTO, {upsert: true, new: true}).exec()
            .then((userModel: IUserModel) => {
                const userDTO = UserRouter.createUserDTO(userModel);
                console.log(userDTO);
                return res.status(200).json(userDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            });
    }

    /**
     * POST save a User
     */
    public save(req: Request, res: Response, next: NextFunction) {
        const userDTO = req.body;
        new User(userDTO).save()
            .then((userModel: IUserModel) => {
                const userDTO = UserRouter.createUserDTO(userModel);
                return res.status(200).json(userDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    /**
     * GET all User
     */
    public getAll(req: Request, res: Response, next: NextFunction) {

        User.find().exec()
            .then((users: IUserModel[]) => {
                const userDTOs: UserDTO[] = [];
                users.forEach(user => {
                    const userDTO = UserRouter.createUserDTO(user);
                    userDTOs.push(userDTO);
                });
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
                const userDTO = UserRouter.createUserDTO(user);
                return res.status(200).json(userDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    init() {
        this.router.get('/all', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.save);
        this.router.put('/', this.update);
    }
}