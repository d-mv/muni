import mongoose from "mongoose";

const User = require("./user");
const News = require("./news");
export interface LocationNameType {
  [index: string]: string;
}
export interface Location {
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

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
