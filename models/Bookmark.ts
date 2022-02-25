/**
 * @file Declares Like data type representing relationship between
 * users and bookmarks, as in user bookmarks a tuit
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Bookmark Represents likes relationship between a user and a bookmark,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 * @property {User} BookmarkedBy User bookmarking the tuit
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    BookmarkedBy: User
};