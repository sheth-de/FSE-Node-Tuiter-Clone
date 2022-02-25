/**
 * @file creates a mongoose collection for tuits in the mongodb database with the given schema
 */
import mongoose, {Schema} from "mongoose";

const TuitSchema = new mongoose.Schema({
  tuit: {type: String, required: true},
      postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
      postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'});
export default TuitSchema;