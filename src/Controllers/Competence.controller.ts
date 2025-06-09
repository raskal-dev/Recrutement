import { Request, Response } from "express";
import { SendError, SendResponse } from "../Middlewares/SendResponse.middleware";
import { getCompetences } from "../Services/CompetenceServices";
import { BaseError } from "../Utils/BaseErrer";

export const getCompetencesController = async (req: Request, res: Response) => {
    try {
        const competences = await getCompetences();
        SendResponse(res, competences, "Liste des compétences");
    } catch (err: any) {
        if (err instanceof BaseError) {
            return SendError(res, err.message, err.statusCode);
        }
        
        return SendError(res, err.message, 500);
    }
}