/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessagingDao from "../daos/MessagingDao";
import MessagingControllerI from "../interfaces/messaging/MessagingControllerI";
import Messaging from "../models/Messaging";


/**
 * @class MessagingController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/messages/sent/:from to retrieve all the messages sent by a user </li>
 *     <li>GET /api/messages/received/:to to retrieve messages received by a user </li>
 *     <li>POST /api/messages to record a message sent from one user to another user </li>
 *     <li>DELETE /api/message/:mid to delete a message sent from one user to another </li>
 * </ul>
 * @property {MessagingDao} messagingDao Singleton DAO implementing likes CRUD operations
 * @property {MessagingController} messagingController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessagingController implements MessagingControllerI {
    private static messagingDao: MessagingDao = MessagingDao.getInstance();
    private static messagingController: MessagingController | null = null;
    public static getInstance = (app: Express): MessagingController => {
        if (MessagingController.messagingController === null) {
            MessagingController.messagingController = new MessagingController();
            app.get("/api/messages/sent/:from", MessagingController.messagingController.findMessagesSent);
            app.get("/api/messages/received/:to", MessagingController.messagingController.findMessagesReceived);
            app.post("/api/users/:uid1/sends/:uid2", MessagingController.messagingController.createMessage);
            app.delete("/api/message/:mid", MessagingController.messagingController.deleteMessage);
        }
        return MessagingController.messagingController;
    }

    private constructor() {
    }

    /**
     * Retrieves all messages that were sent by the logged-in user
     * @param {Request} req Represents request from client, including the path
     * parameter "from" representing the primary key of the logged-in user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSent = (req: Request, res: Response) =>
        MessagingController.messagingDao.findMessagesSent(req.params.from)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages that were received by the logged-in user
     * @param {Request} req Represents request from client, including the path
     * parameter "to" representing the primary key of the logged-in user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesReceived = (req: Request, res: Response) =>
        MessagingController.messagingDao.findMessagesReceived(req.params.to)
            .then(messages => res.json(messages));

    /**
     * Creates a message instance with a message string sent from one user to another
     * @param {Request} req Represents request from client, including the
     * request body, that would have the primary key of the sender user, receiver user, the message string
     * and the timestamp
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messaging instance that was inserted in the
     * database
     */
    createMessage = (req: Request, res: Response) =>
        MessagingController.messagingDao.createMessage(req.params.uid1,req.params.uid2,req.body)
            .then((message: Messaging) => res.json(message));

    /**
     * Deletes a message entry from the database
     * @param {Request} req Represents request from client, including the
     * path parameter mid that represents the message id that needs to be removed from the database
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessagingController.messagingDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
};