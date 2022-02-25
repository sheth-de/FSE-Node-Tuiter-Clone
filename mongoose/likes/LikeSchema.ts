/**
 * @file creates a mongoose collection for likes in the mongodb database with the given schema
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/Like";

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;