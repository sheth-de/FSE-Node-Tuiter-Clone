import Like from "../models/likes/Like";
import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    userRemovesDislikeTuit (tid: string, uid: string): Promise<any>;
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
};