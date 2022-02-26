/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessagingModel
 * to integrate with MongoDB
 */
import Messaging from "../models/Messaging";
import MessagingModel from "../mongoose/messaging/MessagingModel";
import MessagingDaoI from "../interfaces/messaging/MessagingDaoI";
import TuitModel from "../mongoose/tuits/TuitModel";


/**
 * @class MessagingDao Implements Data Access Object managing data storage
 * of Messaging
 * @property {MessagingDao} messagingDao Private single instance of MessagingDao
 */
export default class MessagingDao implements MessagingDaoI {
    private static messagingDao: MessagingDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessagingDao
     */
    public static getInstance = (): MessagingDao => {
        if(MessagingDao.messagingDao === null) {
            MessagingDao.messagingDao = new MessagingDao();
        }
        return MessagingDao.messagingDao;
    }
    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {Messaging} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    createMessage = async (uid1:string, uid2:string,message: Messaging): Promise<Messaging> =>
        MessagingModel.create({...message, to: uid2, from: uid1});

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessagingModel.deleteOne({_id: mid});

    /**
     * Uses MessagingModel to retrieve messages sent by the logged-in user
     * @param {string} from logged-in User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesSent = async (from: string): Promise<Messaging[]> =>
        MessagingModel
            .find({from: from})
            .populate("message")
            .exec();

    /**
     * Uses MessagingModel to retrieve messages received by the logged-in user
     * @param {string} to logged-in User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesReceived = async (to: string): Promise<Messaging[]> =>
        MessagingModel
            .find({to: to})
            .populate("message")
            .exec();

    /**
     * Uses MessagingModel to retrieve messages received by the logged-in user from selected user
     * @param {string} to logged-in User's primary key
     * @param{string} from the primary key of selected user
     * @returns Promise To be notified when messages are retrieved from the database
     */
    checkMessagesReceivedFromUser = async (to: string, from: string): Promise<Messaging[]> =>
        MessagingModel.find({to: to, from: from});

    /**
     * Uses MessagingModel to retrieve messages sent by the logged-in user to a selected user
     * @param {string} from logged-in User's primary key
     * @param {string} to is the selected user's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    checkMessagesSentByUser = async (from: string, to: string): Promise<Messaging[]> =>
        MessagingModel.find({to: to, from: from});

}