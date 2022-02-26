/**
 * @file defines DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import Follow from "../../models/Follow";

/**
 * @interface FollowDaoI Implements Data Access Object managing data storage
 * of Follow
 */
export default interface FollowDaoI{

    /**
     * Inserts follow instance into the database
     * @param {string} uid1 is the current logged-in user
     * @param {string} uid2 is the user that the current user wants to follow
     * @returns Promise To be notified when follows is inserted into the database
     */
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;

    /**
     * Removes follow from the database.
     * @param {string} uid1 Primary key of logged-in user
     * @param {string} uid2 Primary key of user that they want to unfollow
     * @returns Promise To be notified when follows instance is removed from the database
     */
    userUnfollowsUser (uid1: string, uid2: string): Promise<any>;

    /**
     * Uses FollowModel to retrieve users that the current user follows
     * @param {string} uid user's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findFollowing (uid: string): Promise<Follow[]>;

    /**
     * Uses FollowModel to retrieve users that follow the current user
     * @param {string} uid user's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findFollowers (uid: string): Promise<Follow[]>;

    /**
     * Uses FollowModel to retrieve boolean value whether the user is present in the
     * following list of other user
     * @param {string} uid1 current user's primary key
     * @param {string} uid2 other user's primary key
     * @returns Promise To be notified when the boolean result is retrieved from the database
     */
    checkIfUserPresentInFollowing(uid1: string, uid2:string): Promise<any>;

    /**
     * Uses FollowModel to retrieve boolean value whether the user is present in the
     * followers list of other user
     * @param {string} uid1 current user's primary key
     * @param {string} uid2 other user's primary key
     * @returns Promise To be notified when the boolean result is retrieved from the database
     */
    checkIfUserPresentInFollowers(uid1: string, uid2:string): Promise<any>;
};