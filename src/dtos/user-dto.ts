import {Role} from "../enums/role";
import {CategoryDTO} from "./category-dto";
import {HappeningDTO} from "./happening-dto";

export interface UserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    interestedCategories: Array<CategoryDTO>;
    happenings: Array<HappeningDTO>;
}