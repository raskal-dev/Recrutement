import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { db } from "../Models";
import { SendError } from "./SendResponse.middleware";
import { Role } from "../Utils/Enums/Role.enum";

const User = db.users as any;

export const jwtMiddleware = ( roles: Role[] ) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return SendError(res, 'Access denied!');
            }

            const token = authHeader.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as any;
            const userEmail = decodedToken.userEmail;
            const user = await User.findOne({ where: { email: userEmail } });
            if (!user) {
                return SendError(res, 'Utilisateur non trouvé', 404);
            }
            if (!roles.includes(user.role)) {
                return SendError(res, 'Vous n\'êtes pas autorisé à effectuer cette action.', 403);
            }
            // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
            req.auth = {
                userEmail,
                user
            };
            return next();
        } catch (error: any) {
            return SendError(res, error.message, 401);
        }
    }
};