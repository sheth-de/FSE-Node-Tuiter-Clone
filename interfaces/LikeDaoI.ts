import Like from "../models/likes/Like";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;
    userLikesTuit (tid: string, uid: string): Promise<Like>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
};