import express from "express";
import { createOfferController } from "../Controllers/Offer.controller";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";

const offerRouter = express.Router();

offerRouter.get("/", jwtMiddleware, createOfferController);
offerRouter.post("/", jwtMiddleware, createOfferController);

export default offerRouter;