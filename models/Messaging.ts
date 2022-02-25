/**
 * @file Declares Messaging data type representing messages sent by one user to another
 */
import User from "./User";

/**
 * @typedef Messaging Represents messages sent by one user to another
 * @property {string} message is the message string sent by user
 * @property {User} to the receiver
 * @property {User} from the sender
 * @property {Date} sentOn is the timestamp of when the message was sent
 */

export default class Messaging {
    private message: string='';
    private to: User | null=null;
    private from: User | null = null;
    private sentOn: Date = new Date();
};