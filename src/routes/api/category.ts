const express = require("express");
const router = new express.Router();

const Category = require("../../models/category");
const Post = require("../../models/post");

const authenticate = require("../../middleware/auth");

router.post("/", authenticate, async (req: any, res: any) => {
  const post = new Category({
    ...req.body
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const Categories = await Category.find({});
    res.send(Categories);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id/posts", authenticate, async (req: any, res: any) => {
  try {
    const Posts = await Post.find({ category: req.params.id });
    res.send(Posts);
  } catch (error) {
    res.status(500).send();
  }
});

export default Category;
