/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI{
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = () : BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {
    }

    /**
     * Uses BookmarkMdel to retrieve tuits that are bookmarked by the user
     * @param {string} uid user's primary key
     * @returns Promise To be notified when bookmarks are retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string) : Promise<Bookmark[]> =>
        BookmarkModel.find({BookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Uses BookmarkMdel to retrieve users that bookmarked a tuit
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string) : Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit:tid})
            .populate("BookmarkedBy")
            .exec();

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid is the current logged-in user
     * @param {string} tid is tuit that the user wants to bookmark
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (tid: string, uid: string) : Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit:tid, BookmarkedBy:uid});

    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of logged-in user
     * @param {string} tid Primary key of tuit that the user wants to bookmark
     * @returns Promise To be notified when bookmark instance is removed from the database
     */
    userUnBookmarksTuit = async (tid: string, uid: string) : Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, BookmarkedBy:uid});
}