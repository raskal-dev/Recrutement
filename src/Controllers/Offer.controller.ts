import { Request, Response } from "express";
import { db } from "../Models";
import { Role } from "../Utils/Enums/Role.enum";
import { createOffer } from "../Services/OfferServices";
import { IOffer } from "../Utils/Interface/IOffer";
import { SendResponse } from "../Middlewares/SendResponse.middleware";


export const createOfferController = async (req: Request, res: Response) => {
    try {
        const user = await db.auth.user;

        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        if (user.role !== Role.ENTREPRISE) {
            throw new Error("Seuls les utilisateurs avec le rôle 'entreprise' peuvent créer des offres.");
        }

        const offer = await createOffer(req.body as IOffer);
        SendResponse(res, offer, "Offre ajouté avec succes!");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 400);
    }
};