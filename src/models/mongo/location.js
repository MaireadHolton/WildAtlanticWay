import Mongoose from "mongoose";
import Boom from "@hapi/boom";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  location: String,
  latitude: Number,
  longitude: Number,
  date: String,
  details: String,
  listid: {
    type: Schema.Types.ObjectId,
    ref: "List",
  },
});

export const Location = Mongoose.model("Location", locationSchema);
