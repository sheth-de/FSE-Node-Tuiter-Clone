import Messaging from "../../models/Messaging";

export default interface MessagingDaoI {
    findMessagesSent(from: string): Promise<Messaging[]>;
    findMessagesReceived(from: string): Promise<Messaging[]>;
    createMessage(messaging: Messaging): Promise<Messaging>;
    deleteMessage(mid: string): Promise<any>;
}