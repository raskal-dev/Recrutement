import { Request, Response } from "express";
import { db } from "../Models";
import { Role } from "../Utils/Enums/Role.enum";
import { createOffer, deleteOffer, getOffers, getOffer, updateOffer } from "../Services/OfferServices";
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

export const getOfferController = async (req: Request, res: Response) => {
    try {
        const offerId = parseInt(req.params.offerId);
        if (isNaN(offerId)) {
            return SendError(res, "ID invalide", 400);
        }

        const offer = await getOffer(offerId);
        SendResponse(res, offer, "Offre trouvé");
    } catch (err: any) {
        return SendError(res, "Message d'erreur", 500);
    }
}

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

export const updateOfferController = async (req: Request, res: Response) => {
    try {
        const offerId = parseInt(req.params.offerId);
        if (isNaN(offerId)) {
            return SendError(res, "ID invalide", 400);
        }

        if (!req.body) {
            return SendError(res, "Les données sont requises", 400);
        }

        const updatedOffer = await updateOffer(offerId, req.body);
        SendResponse(res, updatedOffer, "Offre modifié avec succès");
    } catch (err: any) {
        SendError(res, "Erreur de mise à jour", 500);
    }
};

export const deleteOfferController = async (req: Request, res: Response) => {
    try {
        const offerId = parseInt(req.params.offerId);
        if (isNaN(offerId)) {
            return SendError(res, "ID invalide", 400);
        }

        const result = await deleteOffer(offerId);
        SendResponse(res, result, "Offre supprimée avec succès");
    } catch (err: any) {
        return SendError(res, "Erreur de suppression", 500);
    }
};