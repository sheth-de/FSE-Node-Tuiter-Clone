/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import  Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} dislikeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Uses LikeModel to retrieve all users that disliked a tuit from users collection
     * @param tid is the tuit id for which users that disliked need to be found
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all tuits disliked by user from likes collection
     * @param uid is the userid whose list of disliked tuits need to be found
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Inserts dislike instance into the database
     * @param uid is the user that dislikes the tuit
     * @param tid is the tuit disliked by the user
     * @returns Promise To be notified when user is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Uses LikeModel to retrieve if a tuit is disliked by a user from dislikes collection
     * @returns Promise To be notified when the result is retrieved from
     * database
     */
    findUserDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Removes dislike instance into the database
     * @param uid is the user that removes dislike of the tuit
     * @param tid is the tuit un disliked by the user
     * @returns Promise To be notified when user is removed from the database
     */
    userRemovesDislikeTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses LikeModel to retrieve the count of the number of dislikes for a tuit
     * @param tid is the tuit id for which dislike count needs to be found
     * @returns Promise To be notified when the count is retrieved from
     * database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}