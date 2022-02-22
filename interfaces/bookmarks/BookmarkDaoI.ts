import Bookmark from "../../models/Bookmark";

export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnBookmarksTuit (tid: string, uid: string): Promise<any>;
};