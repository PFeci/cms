import {Role} from "../enums/role";

export interface UserAuthenticateDTO {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}