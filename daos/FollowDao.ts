/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/follow/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/follow/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follow
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Uses FollowModel to retrieve users that follow the current user
     * @param {string} uid user's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve users that the current user follows
     * @param {string} uid user's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Inserts follow instance into the database
     * @param {string} uid1 is the current logged-in user
     * @param {string} uid2 is the user that the current user wants to follow
     * @returns Promise To be notified when follows is inserted into the database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowing: uid1, userFollowed: uid2});

    /**
     * Removes follow from the database.
     * @param {string} uid1 Primary key of logged-in user
     * @param {string} uid2 Primary key of user that they want to unfollow
     * @returns Promise To be notified when follows instance is removed from the database
     */
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid1, userFollowed: uid2});

};