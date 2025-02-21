import express from "express";
import { createOfferController, deleteOfferController, getOffersController, updateOfferController } from "../Controllers/Offer.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";

const offerRouter = express.Router();

offerRouter.get("/", jwtMiddleware, getOffersController);
offerRouter.post("/", jwtMiddleware, createOfferController);
offerRouter.put("/:offerId", jwtMiddleware, updateOfferController);
offerRouter.delete("/:offerId", jwtMiddleware, deleteOfferController);

export default offerRouter;