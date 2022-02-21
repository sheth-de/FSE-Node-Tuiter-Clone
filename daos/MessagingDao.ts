import Messaging from "../models/Messaging";
import MessagingModel from "../mongoose/MessagingModel";
import MessagingDaoI from "../interfaces/MessagingDaoI";


export default class MessagingDao implements MessagingDaoI {
    private static messagingDao: MessagingDao | null = null;
    public static getInstance = (): MessagingDao => {
        if(MessagingDao.messagingDao === null) {
            MessagingDao.messagingDao = new MessagingDao();
        }
        return MessagingDao.messagingDao;
    }
    private constructor() {}

    createMessage = async (message: Messaging): Promise<Messaging> =>
        MessagingModel.create(message);
    deleteMessage = async (mid: string): Promise<any> =>
        MessagingModel.deleteOne({_id: mid});
    findMessagesSent = async (from: string): Promise<Messaging[]> =>
        MessagingModel
            .find({from: from})
            .populate("message")
            .exec();
    findMessagesReceived = async (to: string): Promise<Messaging[]> =>
        MessagingModel
            .find({to: to})
            .populate("message")
            .exec();
}