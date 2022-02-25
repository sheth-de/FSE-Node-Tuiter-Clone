/**
 * @file Declares Tuit data type representing the tuits posted by a user
 */
import User from "./User";


/**
 * @typedef Tuit Represents a tuit posted by a user
 * @property {string} tuit is the message string in the user's tuit
 * @property {Date}  postedOn is the timestamp at which the tuit was posted
 * @property {User} postedBy is the user who posted the tuit
 */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;
}

