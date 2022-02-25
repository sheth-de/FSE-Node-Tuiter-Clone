/**
 * @file defines DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../../models/Tuit";

/**
 * @interface TuitDao defines Data Access Object managing data storage
 * of Tuits
 */
export default interface TuitDao {

   /**
    * Uses TuitModel to retrieve all tuits from tuits collection
    * @returns Promise To be notified when the tuits are retrieved from
    * database
    */
   findAllTuits(): Promise<Tuit[]>;

   /**
    * Uses TuitModel to retrieve tuits by a single user's tuits from the tuits collection
    * @param {string} uid User's primary key
    * @returns Promise To be notified when tuits are retrieved from the database
    */
   findTuitsByUser(tid: string): Promise<Tuit[]>;

   /**
    * Uses TuitModel to retrieve tuits posted by a particular user
    * @param {string} uid user's primary key
    * @returns Promise To be notified when the tuits are retrieved from the database
    */
   findTuitById(tid: string): Promise<Tuit>;

   /**
    * Inserts tuit instance into the database
    * @param {Tuit} tuit Instance to be inserted into the database
    * @param {string}uid is the primary key of the user who wants to create the tuit
    * @returns Promise To be notified when tuit is inserted into the database
    */
   createTuit(uid: string, tuit: Tuit): Promise<Tuit>;

   /**
    * Updates tuit with new values in database
    * @param {string} tid Primary key of logged-user
    * @param {Tuit} tuit Tuit object containing properties and their new values
    * @returns Promise To be notified when tuit is updated in the database
    */
   updateTuit(tid: string, tuit: Tuit): Promise<any>;

   /**
    * Removes tuit from the database.
    * @param {string} tid Primary key of tuit to be removed
    * @returns Promise To be notified when tuit is removed from the database
    */
   deleteTuit(tid: string): Promise<any>;
}

