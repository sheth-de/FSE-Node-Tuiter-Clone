/**
 * @file Controller interface for RESTful Web service API for messages resource
 */
import {Request, Response} from "express";


/**
 * @interface MessagingControllerI defines RESTful Web service API for messages resource.
 */
export default interface MessagingControllerI {

    /**
     * Creates a message instance with a message string sent from one user to another
     * @param {Request} req Represents request from client, including the
     * request body, that would have the primary key of the sender user, receiver user, the message string
     * and the timestamp
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messaging instance that was inserted in the
     * database
     */
    createMessage (req: Request, res: Response): void;

    /**
     * Deletes a message entry from the database
     * @param {Request} req Represents request from client, including the
     * path parameter mid that represents the message id that needs to be removed from the database
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    deleteMessage (req: Request, res: Response): void;

    /**
     * Retrieves all messages that were sent by the logged-in user
     * @param {Request} req Represents request from client, including the path
     * parameter "from" representing the primary key of the logged-in user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSent (req: Request, res: Response): void;

    /**
     * Retrieves all messages that were received by the logged-in user
     * @param {Request} req Represents request from client, including the path
     * parameter "to" representing the primary key of the logged-in user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesReceived (req: Request, res: Response): void;
}