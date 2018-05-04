import {Role} from "../enums/role";
import {CategoryDTO} from "./category-dto";

export interface UserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    interestedCategories: Array<CategoryDTO>
}