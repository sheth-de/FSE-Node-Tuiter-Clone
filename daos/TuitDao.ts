/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/tuits/TuitDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {UserDao} userDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuits from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses TuitModel to retrieve tuits by a single user's tuits from the tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses TuitModel to retrieve tuits posted by a particular user
     * @param {string} uid user's primary key
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @param {string}uid is the primary key of the user who wants to create the tuit
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuit = async (uid: string, tuit: Tuit): Promise<Tuit> =>
            TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of logged-user
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
}