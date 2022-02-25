/**
 * @file Creates a structured model for the Users entity
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents a user that was added to the database
 * @property {string} username is theusername of the new user
 * @property {string} password is password of the new user
 * @property {string} firstName is the firstName of the new user
 * @property {string} lastName is the lastname of the new user
 * @property {string} email is the email id of the new user
 * @property {string} profilePhoto is the profile photo of the new user
 * @property {string} headerImage is the headerImage of the new user
 * @property {AccountType} accountType is the accountType of the new user
 * @property {MaritalStatus} maritalStatus is the MaritalStatus of the new user
 * @property {string} biography is the biography of the new user
 * @property {Date} dateOfBirth is the dateOfBirth of the new user
 * @property {Date} joined is the date of joining tuiter of the new user
 * @property {Location} location is the location of the new user
 */
export default class User {
   private username: string = '';
   private password: string = '';
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;
}
