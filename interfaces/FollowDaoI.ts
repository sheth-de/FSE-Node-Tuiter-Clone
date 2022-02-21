import Follow from "../models/Follow";

export default interface FollowDaoI{
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;
    userUnfollowsUser (uid1: string, uid2: string): Promise<any>;
    findFollowing (uid: string): Promise<Follow[]>;
    findFollowers (uid: string): Promise<Follow[]>;
};