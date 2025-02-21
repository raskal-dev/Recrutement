import { NextFunction, Request, Response } from "express";
import { createUser, deleteUser, getUser, getUsers, login, updateUser } from "../Services/UserServices";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { IUser } from "../Utils/Interface/IUser";
import bcrypt from 'bcrypt';
import { BaseError } from "../Utils/BaseErrer";



export const getUsersController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        SendResponse(res, users, "Liste des Users");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, "Erreur interne du serveur", 500);
    }
};

export const getUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return SendError(res, "ID invalide", 400);
        }

        const user = await getUser(userId);
        SendResponse(res, user, "Utilisateur trouvé");
    }
    catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, "Erreur interne du serveur", 500);
    }
};

export const createUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await createUser(req.body as IUser);
        SendResponse(res, user, "Insertion de User");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, "Erreur interne du serveur", 500);
    }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId); // Extraire l'ID depuis l'URL
        if (isNaN(userId)) {
            return SendError(res, "ID invalide", 400);
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await updateUser(userId, req.body);
        SendResponse(res, updatedUser, "Utilisateur modifié avec succès");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, "Erreur interne du serveur", 500);
    }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return SendError(res, "ID invalide", 400);
        }

        const result = await deleteUser(userId);
        SendResponse(res, result, "Suppression de l'utilisateur réussie");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, "Erreur interne du serveur", 500);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await login(req);
        SendResponse(res, result, "Connexion réussie");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, "Erreur interne du serveur", 500);
    }
};