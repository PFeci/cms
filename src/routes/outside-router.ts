import {Router, Request, Response, NextFunction} from 'express';
import {IUserModel, User} from "../database/schemas/user-schema";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken"
import {UserRouter} from "./user-router";
import {UserDTO} from "../dtos/user-dto";
import {Config} from "../config";
import {UserAuthenticateDTO} from "../dtos/user-authenticate-dto";
import {Role} from "../enums/role";

export class OutsideRouter {
    router: Router;
    static saltRounds: number = 10;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * POST register a new User
     */
    public register(req: Request, res: Response, next: NextFunction) {

        const userAuthenticateDTO: UserAuthenticateDTO = req.body;

        User.findOne({email: userAuthenticateDTO.email}).exec()
            .then((user: IUserModel) => {
                if (user) {
                    throw new Error('Email already exists');
                }
                if (!userAuthenticateDTO.password) {
                    throw new Error("Password is not provided");
                }
                return bcrypt.hashSync(userAuthenticateDTO.password, OutsideRouter.saltRounds)
            })
            .then((hash) => {
                userAuthenticateDTO.password = hash;
                userAuthenticateDTO.role = Role.USER;
                return new User(userAuthenticateDTO).save();
            })
            // return with the saved user
            .then(() => {
                return User.findOne({email: userAuthenticateDTO.email}).exec();
            })
            .then((userModel: IUserModel) => {
                const userDTO = UserRouter.createUserDTO(userModel);

                return res.status(201).json(userDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(409).json({message: err.message});
            })
    }

    /**
     * POST login a User
     */
    public login(req: Request, res: Response, next: NextFunction) {

        const userAuthenticateDTO: UserAuthenticateDTO = req.body;

        User.findOne({email: userAuthenticateDTO.email}).exec()
            .then((user: IUserModel) => {
                if (user && userAuthenticateDTO.password && user.password &&
                    bcrypt.compareSync(userAuthenticateDTO.password, user.password)) {
                    return UserRouter.createUserDTO(user);
                }
                throw new Error();
            })
            .then((userDTO: UserDTO) => {
                const token = jwt.sign({id: userDTO.id, role: userDTO.role, email: userDTO.email}, Config.secret, {
                    expiresIn: 86400 // expires in 2 hours
                });
                return res.status(200).json({token: token, user: userDTO});

            })
            .catch((err: any) => {
                return res.status(401).json({message: "Unauthorized Access"});
            })

    }

    init() {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }
}