import mongoose, {Schema} from "mongoose";

const MessagingSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessagingSchema;