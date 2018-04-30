import {Router, Request, Response, NextFunction} from 'express';
import {IUserModel, User} from "../database/schemas/user-schema";
import {UserDTO} from "../dtos/user-dto";
import {AuthGuard} from "./auth-guard";
import {HappeningDTO} from "../dtos/happening-dto";
import {IHappeningModel, Happening} from "../database/schemas/happening-schema";

export class HappeningRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public static createHappeningDTO(happeningModel: IHappeningModel): HappeningDTO {
        const happeningDTO: HappeningDTO = {
            id: happeningModel._id,
            location: happeningModel.location,
            date: happeningModel.date,
            creator: happeningModel.creator,
            description: happeningModel.description,
            categories: happeningModel.categories,
            contents: happeningModel.contents,
            secondCategories: happeningModel.secondCategories
        };
        return happeningDTO;
    }

    /**
     * POST save a Happening
     */
    public save(req: Request, res: Response, next: NextFunction) {
        const happeningDTO = req.body;
        new Happening(happeningDTO).save()
            .then((happeningModel: IHappeningModel) => {
                const happeningDTO: HappeningDTO = HappeningRouter.createHappeningDTO(happeningModel);
                return res.status(200).json(happeningDTO);
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
        const happeningDTO: HappeningDTO = req.body;
        Happening.findOneAndUpdate({_id: happeningDTO.id}, happeningDTO, {upsert: true, new: true}).exec()
            .then((eventModel: IHappeningModel) => {
                const happeningDTO = HappeningRouter.createHappeningDTO(eventModel);
                console.log(happeningDTO);
                return res.status(200).json(happeningDTO);
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
            .then((happenings: IHappeningModel[]) => {
                const happeningDTOs: HappeningDTO[] = [];
                happenings.forEach(happening => {
                    const happeningDTO: HappeningDTO = HappeningRouter.createHappeningDTO(happening);
                    happeningDTOs.push(happeningDTO);
                });
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
                const happeningDTO: HappeningDTO = HappeningRouter.createHappeningDTO(happening);
                return res.status(200).json(happeningDTO);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({message: err});
            })
    }

    init() {
        this.router.get('/all', this.getAll);
        this.router.get('/:id', AuthGuard.verifyToken, this.getOne);
        this.router.put('/', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.update);
        this.router.post('/', AuthGuard.verifyToken, AuthGuard.verifySupporter, this.save);
    }
}