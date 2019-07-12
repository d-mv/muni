import * as mongoose from "mongoose";

const Post = require("./post");

export interface IndexedStringsType {
  [index: string]: string;
}
export interface Category {
  name: IndexedStringsType[];
  description: IndexedStringsType[];
  createdAt: Date;
}

const CategorySchema = new mongoose.Schema({
  name: {
    עב: { type: String, required: true, trim: true, minLength: 3 },
    ع: { type: String, required: true, trim: true, minLength: 3 },
    en: { type: String, required: true, trim: true, minLength: 3 }
  },
  description: {
    עב: { type: String, required: true, trim: true, minLength: 3 },
    ع: { type: String, trim: true, minLength: 3 },
    en: { type: String, trim: true, minLength: 3 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CategorySchema.pre("remove", async function(next:any) {
  const category = this;
  await Post.deleteMany({ category: category._id });
  next();
});

CategorySchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "category"
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
