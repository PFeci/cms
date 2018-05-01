import {Role} from "../enums/role";

export interface UserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}