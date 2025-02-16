import { NextFunction, Request, Response } from "express";
import { createUser, getUsers } from "../Services/UserServices";
import { SendResponse } from "../Middlewares/SendResponse.middleware";
import { IUser } from "../Utils/UserInterface/IUser";
const bcrypt = require('bcrypt');




export const userAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        SendResponse(res, users, "Liste des Users");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 500);
    }
}


export const store = async(req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await createUser(req.body as IUser);
        SendResponse(res, user, "Insertion de User");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 400);
    }
}