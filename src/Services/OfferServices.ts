import { db } from "../Models";
import { BaseError } from "../Utils/BaseErrer";
import { IOffer } from "../Utils/Interface/IOffer";
import logger from 'morgan';

const Offer = db.offers as any;

export const getOffers = async () => {
    return await Offer.findAll({
        include: [
            {
                model: db.users,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
        ],
    });
};

export const getOffer = async (id: number) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        throw new BaseError("Offre non trouvée", 404);
    }
    
    return await Offer.findByPk(id, {
        include: [
            {
                model: db.users,
                attributes: ["id", "name", "email", "about", "adress", "role"],
            },
        ],
    });
};

export const createOffer = async (offer: IOffer) => {
    return await Offer.create(offer);
};

export const updateOffer = async (id: number, offer: IOffer) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        console.log(logger("Offre non trouvée"), 404);
        throw new BaseError("Offre non trouvée", 404);
    }

    await Offer.update(offer, { where: { id } });

    return await Offer.findByPk(id);
};

export const deleteOffer = async (id: number) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        throw new BaseError("Offre non trouvée", 404);
    }

    await Offer.destroy({ where: { id } });

    return { message: "Offre supprimée avec succès" };
};
