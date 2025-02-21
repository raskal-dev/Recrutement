import { db } from "../Models";
import { IOffer } from "../Utils/Interface/IOffer";

const Offer = db.offers as any;

export const getOffers = async () => {
    return await Offer.findAll();
};

export const createOffer = async (offer: IOffer) => {
    return await Offer.create(offer);
};
