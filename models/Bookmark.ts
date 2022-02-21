import Tuit from "./Tuit";
import User from "./User";

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    BookmarkedBy: User
};