import { Response } from "express";


export const SendResponse = (res: Response, data: any = [], message: string = "Success Operation", statusCode: number = 200) => {
    res.status(statusCode).json({ success:true, message, data });
}