import { db } from "../Models";
import { IOffer } from "../Utils/Interface/IOffer";

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
        throw new Error("Offre non trouvée");
    }

    await Offer.update(offer, { where: { id } });

    return await Offer.findByPk(id);
};

export const deleteOffer = async (id: number) => {
    const existingOffer = await Offer.findByPk(id);
    if (!existingOffer) {
        throw new Error("Offre non trouvée");
    }

    await Offer.destroy({ where: { id } });

    return { message: "Offre supprimée avec succès" };
};
