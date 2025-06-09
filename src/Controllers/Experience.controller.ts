import { Request, Response } from "express";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { BaseError } from "../Utils/BaseErrer";
import { createExperience, getExperience, getExperiences } from "../Services/ExperienceServices";
import { IExperience } from "../Utils/Interface/IExperience";

export const getExperiencesController = async (req: Request, res: Response) => {
    try {
        const experiences = await getExperiences();
        SendResponse(res, experiences, "Experiences trouvés");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const getExperienceController = async (req: Request, res: Response) => {
    try {
        const experienceId = parseInt(req.params.experienceId);
        if (isNaN(experienceId)) {
            return SendError(res, "ID invalide", 400);
        }

        const experience = await getExperience(experienceId);
        SendResponse(res, experience, "Experience trouvé");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};

export const createExperienceController = async (req: Request, res: Response) => {
    try {
        // @ts-expect-error Property 'auth' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        const user = await req.auth.user;

        if (!user) {
            return SendError(res, "Utilisateur non trouvé", 404);
        };

        const dataExperience: IExperience = { ...req.body, UserId: user.id };
        const experience = await createExperience(dataExperience);
        SendResponse(res, experience, "Experience ajouté avec succes!");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }

        return SendError(res, err.message, 500);
    }
};