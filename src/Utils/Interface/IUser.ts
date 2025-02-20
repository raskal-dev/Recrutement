import { Role } from "../Enums/Role.enum";

export interface IUser {
    id?: number;
    firstName?: string;
    company?: string;
    about?: string;
    adress?: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}