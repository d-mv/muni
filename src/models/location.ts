import mongoose from "mongoose";

const User = require("./user");
const News = require("./news");
export interface LocationNameType {
  [index: string]: string;
}
export interface LocationType {
  _id: mongoose.Schema.Types.ObjectId;
  name: LocationNameType[];
  createdAt: Date;
}

const LocationSchema = new mongoose.Schema({
  name: {
    עב: { type: String, required: true, trim: true, minLength: 3 },
    ع: { type: String, required: true, trim: true, minLength: 3 },
    en: { type: String, required: true, trim: true, minLength: 3 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

LocationSchema.pre("remove", async function(next) {
  const location = this;
  await User.deleteMany({ location: location._id });
  await News.deleteMany({ location: location._id });
  next();
});

LocationSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "location"
});
LocationSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "location"
});
LocationSchema.virtual("news", {
  ref: "News",
  localField: "_id",
  foreignField: "location"
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
