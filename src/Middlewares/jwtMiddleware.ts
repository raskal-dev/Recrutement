import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { db } from "../Models";
import { isTokenBlacklisted } from "../Utils/blackList";

const User = db.users as any;

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Access denied!');
        }

        const token = authHeader.split(' ')[1];

        if (await isTokenBlacklisted(token)) {
            throw new Error('Déconnexion effectuée. Veuillez vous reconnecter.');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as any;
        const userEmail = decodedToken.userEmail;
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            throw new Error('Access denied!');
        }
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        req.auth = {
            userEmail,
            user
        };
        return next();
    } catch (error) {
        const err = error as Error; // 🔹 Convertir en type `Error`
        console.error("🔴 Erreur dans jwtMiddleware :", err.message);
        res.status(401).json({ message: "Token invalide ou expiré." });
        return;
    }
};