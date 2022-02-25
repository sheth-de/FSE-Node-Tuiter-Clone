/**
 * @file creates a mongoose collection for follows in the mongodb database with the given schema
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;