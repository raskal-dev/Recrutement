import { Request, Response } from "express";
import { db } from "../Models";
import { Role } from "../Utils/Enums/Role.enum";
import { createOffer, getOffers } from "../Services/OfferServices";
import { IOffer } from "../Utils/Interface/IOffer";
import { SendResponse } from "../Middlewares/SendResponse.middleware";

export const getOffersController = async (req: Request, res: Response) => {
    try {
        const offers = await getOffers();
        SendResponse(res, offers, "Liste des offres");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 500);
    }
};

export const createOfferController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth.user;

        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        if (user.role !== Role.ENTREPRISE) {
            throw new Error("Seuls les entreprises peuvent créer des offres.");
        }

        const dataOffer: IOffer = {...req.body, UserId: user.id};

        const offer = await createOffer(dataOffer);
        SendResponse(res, offer, "Offre ajouté avec succes!");
    } catch (err: any) {
        SendResponse(res, err, "Message d'erreur", 400);
    }
};