import mongoose from "mongoose";
import { ObjectID } from "bson";

export interface ReplyType {
  text: string;
  createdAt: Date;
  up: ObjectID[];
  down: ObjectID[];
}

export interface PostType {
  location: ObjectID;
  title: string;
  problem: string;
  solution: string;
  photo?: string;
  link?: string;
  newsId?: ObjectID;
  createdBy: ObjectID;
  category: ObjectID;
  active: boolean;
  votes?: ObjectID[];
  reply?: ReplyType;
  createdAt: Date;
}

const PostSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Location"
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    unique: true
  },
  problem: { type: String, required: true, trim: true, minLength: 20 },
  solution: { type: String, required: true, trim: true, minLength: 20 },
  photo: { type: String, trim: true },
  link: { type: String,  trim: true, minLength: 20 },
  newsId: { type: mongoose.Schema.Types.ObjectId },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },
  active: { type: Boolean, required: true, default: true },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  reply: {
    text: { type: String },
    createdAt: { type: Date, default: Date.now },
    up: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    down: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


PostSchema.virtual("users", {
  ref: "User",
  localField: "createdBy",
  foreignField: "_id"
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
