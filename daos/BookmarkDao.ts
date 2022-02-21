import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";

export default class BookmarkDao implements BookmarkDaoI{
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = () : BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {
    }
    findAllTuitsBookmarkedByUser = async (uid: string) : Promise<Bookmark[]> =>
        BookmarkModel.find({BookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
    findAllUsersThatBookmarkedTuit = async (tid: string) : Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit:tid})
            .populate("BookmarkedBy")
            .exec();
    userBookmarksTuit = async (tid: string, uid: string) : Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit:tid, BookmarkedBy:uid});
    userUnBookmarksTuit = async (tid: string, uid: string) : Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, BookmarkedBy:uid});
}