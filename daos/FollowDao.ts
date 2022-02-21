import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    findFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    findFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowing: uid1, userFollowed: uid2});
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid1, userFollowed: uid2});

};