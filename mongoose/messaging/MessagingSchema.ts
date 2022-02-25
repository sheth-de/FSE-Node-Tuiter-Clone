/**
 * @file creates a mongoose collection for messages in the mongodb database with the given schema
 */
import mongoose, {Schema} from "mongoose";

const MessagingSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessagingSchema;