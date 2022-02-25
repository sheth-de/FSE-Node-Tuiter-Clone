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
};