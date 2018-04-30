import {Role} from "../enums/role";

export interface UserDTO {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}