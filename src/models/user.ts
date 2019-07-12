// const mongoose = require("mongoose");
import * as mongoose from "mongoose";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ObjectID } from "bson";

const dotEnv = dotenv.config();
const secret: any = process.env.SECRET;

const Post = require("./post");

export enum UserKind {
  "user",
  "muni"
}

export interface UserSettings {
  language: string;
  help: boolean;
}

export interface UserType {
  _id: ObjectID;
  location: ObjectID;
  fName: string;
  lName: string;
  email: string;
  pass: string;
  type: UserKind;
  tokens: string[];
  settings: UserSettings;
  status: boolean;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Location"
  },
  fName: {
    type: String,
    required: true,
    trim: true
  },
  lName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  pass: {
    type: String,
    trim: true,
    minlength: 7,
    required: true
  },
  type: { type: UserKind, trim: true, required: true, default: "user" },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  settings: {
    language: { type: String, required: true, default: "עב" },
    help: { type: Boolean, required: true, default: true }
  },
  status: { type: Boolean, required: true, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.checkValidCredentials = async (
  email: string,
  pass: string
) => {
  const user: any = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(pass, user.pass);

  if (!isMatch) {
    throw new Error("Wrong password");
  }

  if (!user.status) {
    throw new Error("Not active");
  }

  return user;
};

UserSchema.methods.newAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, secret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  delete userObj.pass;
  delete userObj.tokens;

  return userObj;
};

//hash the plain text password before saving
UserSchema.pre("save", async function(next:any) {
  const user: any = this;
  if (user.isModified("pass")) {
    user.pass = await bcrypt.hash(user.pass, 8);
  }
  next();
});

UserSchema.pre("remove", async function(next:any) {
  const user = this;
  await Post.deleteMany({ createdBy: user._id });
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
