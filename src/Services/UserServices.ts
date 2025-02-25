import { NextFunction, Request, Response } from "express";
import { db } from "../Models";
import { IUser } from "../Utils/Interface/IUser";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BaseError } from "../Utils/BaseErrer";

const User = db.users as any;
const Competence = db.competences as any;

export const getProfile = async (id: number) => {
    return await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'about', 'adress', 'role', 'createdAt', 'updatedAt'],
        include: {
            model: Competence,
            attributes: ['id', 'name']
        }
    });
};

export const addCompetenceToUser = async (userId: number, competenceIds: number[]) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new BaseError("Utilisateur non trouvé", 404);
    }

    const existingCompetences = await Competence.findAll({
        where: { id: competenceIds },
    });

    if (existingCompetences.length !== competenceIds.length) {
        throw new BaseError("Certaines compétences sont introuvables", 404);
    }

    return await user.addCompetences(competenceIds);
};

export const getUsers = async () => {
    return await User.findAll({attributes: ['id', 'name','email', 'about', 'adress', 'role', 'createdAt', 'updatedAt']});
};

export const getUser = async (id: number) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new BaseError("Utilisateur non trouvé", 404);
    };
    
    return await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'about', 'adress', 'role', 'createdAt', 'updatedAt']
    });
};

export const createUser = async (user: IUser) => {
    return await User.create(user);
};

export const updateUser = async (id: number, user: IUser) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new BaseError("Utilisateur non trouvé", 404);
    }

    await User.update(user, { where: { id } });

    return await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'about', 'adress', 'createdAt', 'updatedAt']
    });
};

export const deleteUser = async (id: number) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
        throw new BaseError("Utilisateur non trouvé", 404);
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
        throw new BaseError("Ce compte n'existe pas!", 404);
    }

    const validPassword = await bcrypt.compareSync(password.toString(), user.password.toString());

    if (!validPassword) {
        throw new BaseError("Le mot de passe est incorrect!", 400);
    }

    const token = jwt.sign(
        { userEmail: user.email },
        process.env.JWT_KEY as string,
        { expiresIn: 60 * 60 } // 60 secondes
    );

    return { user, token };
};

