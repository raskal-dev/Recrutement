import { Response } from "express";


export const SendResponse = (res: Response, data: any = [], message: string = "Success Operation", statusCode: number = 200) => {

    if (res.headersSent) {
        console.warn("⚠️ Headers déjà envoyés, réponse annulée.");
        return; // ✅ Évite d'envoyer une deuxième réponse
    }
    
    res.status(statusCode).json({ success:true, message, data });
}