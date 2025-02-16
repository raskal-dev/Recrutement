import { NextFunction, Request, Response } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../Services/UserServices";
import { SendResponse } from "../Middlewares/SendResponse.middleware";
import { IUser } from "../Utils/UserInterface/IUser";
const bcrypt = require('bcrypt');




export const getUsersController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        SendResponse(res, users, "Liste des Users");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 500);
    }
}


export const createUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await createUser(req.body as IUser);
        SendResponse(res, user, "Insertion de User");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 400);
    }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.user); // Extraire l'ID depuis l'URL
        if (isNaN(userId)) {
            return SendResponse(res, null, "ID invalide", 400);
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await updateUser(userId, req.body);
        SendResponse(res, updatedUser, "Utilisateur modifié avec succès");
    } catch (err: any) {
        SendResponse(res, err.message, "Erreur de mise à jour", 400);
    }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return SendResponse(res, null, "ID invalide", 400);
        }

        const result = await deleteUser(userId);
        SendResponse(res, result, "Suppression de l'utilisateur réussie");
    } catch (err: any) {
        SendResponse(res, err.message, "Erreur de suppression", 400);
    }
};
