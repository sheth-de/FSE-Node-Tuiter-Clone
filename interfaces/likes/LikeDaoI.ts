/**
 * @file defines DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import Like from "../../models/Like";

/**
 * @interface LikeDaoI defines Data Access Object managing data storage
 * of Like
 */
export default interface LikeDaoI {

    /**
     * Uses LikeModel to retrieve users that liked a tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;

    /**
     * Uses LikeModel to retrieve tuits that are liked by a user
     * @param {string} uid user's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;

    /**
     * Removes like from the database.
     * @param {string} uid Primary key of user that wants to unlike a tuit
     * @param {string} tid Primary key of tuit that user wants to unlike
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * Inserts like instance into the database
     * @param {string} uid is the user's primary key that likes the tuit
     * @param {string} tid is the tuit's tid that is liked by the user
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit (tid: string, uid: string): Promise<Like>;
};