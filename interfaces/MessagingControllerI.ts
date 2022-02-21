import {Request, Response} from "express";

export default interface MessagingControllerI {
    createMessage (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    findMessagesSent (req: Request, res: Response): void;
    findMessagesReceived (req: Request, res: Response): void;
}