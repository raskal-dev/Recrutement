export interface IUser {
    id?: number;
    firstName?: string;
    company?: string;
    about?: string;
    adress?: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}