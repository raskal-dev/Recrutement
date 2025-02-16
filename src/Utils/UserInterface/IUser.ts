export interface IUser {
    id?: number;
    firstName?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}