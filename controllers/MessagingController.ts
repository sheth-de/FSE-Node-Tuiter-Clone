import {Express, Request, Response} from "express";
import MessagingDao from "../daos/MessagingDao";
import MessagingControllerI from "../interfaces/messaging/MessagingControllerI";
import Messaging from "../models/Messaging";

export default class MessagingController implements MessagingControllerI{
    private static messagingDao: MessagingDao = MessagingDao.getInstance();
    private static messagingController: MessagingController | null = null;
    public static getInstance = (app: Express): MessagingController =>{
        if(MessagingController.messagingController===null){
            MessagingController.messagingController = new MessagingController();
            app.get("/api/messages/sent/:from", MessagingController.messagingController.findMessagesSent);
            app.get("/api/messages/received/:to", MessagingController.messagingController.findMessagesReceived);
            app.post("/api/messages", MessagingController.messagingController.createMessage);
            app.delete("/api/message/:mid", MessagingController.messagingController.deleteMessage);
        }
        return MessagingController.messagingController;
    }
    private constructor() {
    }
    findMessagesSent = (req: Request, res: Response) =>
        MessagingController.messagingDao.findMessagesSent(req.params.from)
            .then(messages=>res.json(messages));
    findMessagesReceived = (req: Request, res: Response) =>
        MessagingController.messagingDao.findMessagesReceived(req.params.to)
            .then(messages => res.json(messages));
    createMessage = (req: Request, res: Response) =>
        MessagingController.messagingDao.createMessage(req.body)
            .then((message: Messaging) => res.json(message));
    deleteMessage = (req: Request, res: Response) =>
        MessagingController.messagingDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
};