/**
 * @file creates a mongoose collection for location in the mongodb database with the given schema
 */
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
   latitude: {type: String, default: 0.0},
   longitude: {type: String, default: 0.0}
}, {collection: 'location'});
export default LocationSchema;