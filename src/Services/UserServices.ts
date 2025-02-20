import { NextFunction, Request, Response } from "express";
import { db } from "../Models";
import { IUser } from "../Utils/Interface/IUser";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { blacklistToken } from "../Utils/blackList";

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

export const login = async (req: Request) => {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({
        where: { email: email }
    });

    if (!user) {
        throw new Error("Ce compte n'existe pas!");
    }

    const validPassword = await bcrypt.compareSync(password.toString(), user.password.toString());

    if (!validPassword) {
        throw new Error("Le mot de passe est incorrect!");
    }

    const token = jwt.sign(
        { userEmail: user.email },
        process.env.JWT_KEY as string,
        { expiresIn: 60 * 60 } // 60 secondes
    );

    return { user, token };
}

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(400).json({ message: "Token requis pour la déconnexion" });
            return;
        }

        blacklistToken(token);
        res.json({ message: "Déconnexion réussie" });
    } catch (err: any) {
        res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
};