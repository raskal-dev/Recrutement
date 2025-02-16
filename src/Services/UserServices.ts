import { db } from "../Models";
import { IUser } from "../Utils/UserInterface/IUser";

const User = db.users as any;

export const getUsers = async () => {
    return await User.findAll({attributes: ['id', 'firstname','email', 'createdAt', 'updatedAt']});
}

export const createUser = async (user: IUser) => {
    return await User.create(user);
}