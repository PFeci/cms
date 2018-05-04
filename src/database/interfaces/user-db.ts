import {Role} from "../../enums/role";

export interface UserDb {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    interestedCategories: Array<string>;
    happenings: Array<string>;
}