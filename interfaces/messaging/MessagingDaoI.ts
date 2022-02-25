/**
 * @file defines DAO managing data storage of messages. Uses mongoose MessagingModel
 * to integrate with MongoDB
 */
import Messaging from "../../models/Messaging";

/**
 * @interface MessagingDaoI defines Data Access Object managing data storage
 * of Messaging
 */
export default interface MessagingDaoI {

    /**
     * Uses MessagingModel to retrieve messages sent by the logged-in user
     * @param {string} from logged-in User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesSent(from: string): Promise<Messaging[]>;

    /**
     * Uses MessagingModel to retrieve messages received by the logged-in user
     * @param {string} to logged-in User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesReceived(to: string): Promise<Messaging[]>;

    /**
     * Inserts message instance into the database
     * @param {Messaging} messaging Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    createMessage(uid1:string, uid2:string, messaging: Messaging): Promise<Messaging>;

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage(mid: string): Promise<any>;
}