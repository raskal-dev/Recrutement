import express from "express";
import { Role } from "../Utils/Enums/Role.enum";
import { jwtMiddleware } from "../Middlewares/jwtMiddleware";
import { createExperienceController, getExperienceController, getExperiencesController } from "../Controllers/Experience.controller";

const experienceRouter = express.Router();
const roleStudent = [Role.STUDENT];
const roleEntreprise = [Role.ENTREPRISE];

experienceRouter.get("/", jwtMiddleware([...roleStudent, ...roleEntreprise]), getExperiencesController);
experienceRouter.get("/:experienceId", jwtMiddleware(roleStudent), getExperienceController);
experienceRouter.post("/", jwtMiddleware(roleStudent), createExperienceController);

export default experienceRouter;