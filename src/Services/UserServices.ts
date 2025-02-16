import { db } from "../Models";
import { IUser } from "../Utils/UserInterface/IUser";

const User = db.users as any;

export const getUsers = async () => {
    return await User.findAll({attributes: ['id', 'firstname','email', 'createdAt', 'updatedAt']});
}

export const createUser = async (user: IUser) => {
    return await User.create(user);
}

export const updateUser = async (id: number, user: IUser) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new Error("Utilisateur non trouvé");
    }

    await User.update(user, { where: { id } });

    return await User.findByPk(id, {
        attributes: ['id', 'firstname', 'email', 'createdAt', 'updatedAt']
    });
};

export const deleteUser = async (id: number) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new Error("Utilisateur non trouvé");
    }

    await User.destroy({ where: { id } });

    return { message: "Utilisateur supprimé avec succès" };
};
