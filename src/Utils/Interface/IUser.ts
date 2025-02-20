export interface IUser {
    id?: number;
    firstName?: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}