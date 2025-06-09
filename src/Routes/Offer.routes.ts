import express, { NextFunction, Request, Response } from "express";
import { createOfferController, deleteOfferController, getOffersController, getOfferController, updateOfferController } from "../Controllers/Offer.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { Role } from "../Utils/Enums/Role.enum";

const offerRouter = express.Router();
const roleEntreprise = [Role.ENTREPRISE];
const roleStudent = [Role.STUDENT];

offerRouter.get("/", jwtMiddleware(roleStudent), getOffersController);
offerRouter.get("/:offerId", jwtMiddleware([...roleStudent, ...roleEntreprise]), getOfferController);
offerRouter.post("/", jwtMiddleware(roleEntreprise) , createOfferController);
offerRouter.put("/:offerId", jwtMiddleware(roleEntreprise), updateOfferController);
offerRouter.delete("/:offerId", jwtMiddleware(roleEntreprise), deleteOfferController);

export default offerRouter;