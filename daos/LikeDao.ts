/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve all users that liked a tuit from users collection
     * @param tid is the tuit id for which users that liked need to be found
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all tuits liked by user from likes collection
     * @param uid is the userid whose list of liked tuits need to be found
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts like instance into the database
     * @param uid is the user that likes the tuit
     * @param tid is the tuit liked by the user
     * @returns Promise To be notified when user is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});


    /**
     * Uses LikeModel to retrieve if a ttuit is liked by a user from likes collection
     * @returns Promise To be notified when the result is retrieved from
     * database
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});


    /**
     * Removes like instance into the database
     * @param uid is the user that likes the tuit
     * @param tid is the tuit liked by the user
     * @returns Promise To be notified when user is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});


    /**
     * Uses LikeModel to retrieve the count of the number of likes for a tuit
     * @param tid is the tuit id for which like count needs to be found
     * @returns Promise To be notified when the count is retrieved from
     * database
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}