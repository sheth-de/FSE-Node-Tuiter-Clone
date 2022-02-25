/**
 * @file Declares User data type representing relationship between
 * users, as in user can follow another user
 */
import User from "./User";

/**
 * @typedef Follow Represents likes relationship between users as in one user
 * can follow another user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User that starts following
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
};