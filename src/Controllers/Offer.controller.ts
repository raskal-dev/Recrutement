import { Request, Response } from "express";
import { db } from "../Models";
import { Role } from "../Utils/Enums/Role.enum";
import { createOffer, getOffers } from "../Services/OfferServices";
import { IOffer } from "../Utils/Interface/IOffer";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";

export const getOffersController = async (req: Request, res: Response) => {
    try {
        const offers = await getOffers();
        SendResponse(res, offers, "Liste des offres");
    } catch (err: any) {
        SendError(res, "Message d'erreur", 500);
    }
};

export const createOfferController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        }

        if (user.role !== Role.ENTREPRISE) {
            return SendError(res, "Vous n'êtes pas autorisé à effectuer cette action.", 403);
        }

        const dataOffer: IOffer = {...req.body, UserId: user.id};

        const offer = await createOffer(dataOffer);
        SendResponse(res, offer, "Offre ajouté avec succes!");
    } catch (err: any) {
        SendError(res, "Message d'erreur", 500);
    }
};