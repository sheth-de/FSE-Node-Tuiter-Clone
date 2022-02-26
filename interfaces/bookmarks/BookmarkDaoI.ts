/**
 * @file Defines DAO interface for managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import Bookmark from "../../models/Bookmark";

/**
 * @interface BookmarkDaoI defines interface for Data Access Object managing data storage
 * of Bookmark
 */
export default interface BookmarkDaoI {

    /**
     * Uses BookmarkMdel to retrieve tuits that are bookmarked by the user
     * @param {string} uid user's primary key
     * @returns Promise To be notified when bookmarks are retrieved from the database
     */
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;

    /**
     * Uses BookmarkMdel to retrieve users that bookmarked a tuit
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid is the current logged-in user
     * @param {string} tid is tuit that the user wants to bookmark
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;

    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of logged-in user
     * @param {string} tid Primary key of tuit that the user wants to bookmark
     * @returns Promise To be notified when bookmark instance is removed from the database
     */
    userUnBookmarksTuit (tid: string, uid: string): Promise<any>;

    /**
     * Uses BookmarkMdel to check if a tuit is bookmarked by the user or not
     * @param {string} tid tuit's primary key
     * @param {string} uid user's primary key
     * @returns Promise To be notified whether or not the tuit is bookmarked from database
     */
    checkIfATuitIsBookmarkedByUser (uid: string, tid:string) :Promise<any>;

    /**
     * Removes all bookmarks of a user from the database.
     * @param {string} uid Primary key of logged-in user
     * @returns Promise To be notified when bookmark instances are removed from the database
     */
    deleteAllBookmarksForUser(uid:string): Promise<any>;
};