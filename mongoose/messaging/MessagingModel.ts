import mongoose from "mongoose";
import MessagingSchema from "./MessagingSchema";
const MessagingModel = mongoose.model('MessagingModel', MessagingSchema);
export default MessagingModel;