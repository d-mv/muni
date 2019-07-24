const express = require("express");
const router = new express.Router();

const Category = require("../../models/category");
const Post = require("../../models/post");

const authenticate = require("../../middleware/auth");

router.post("/", authenticate, async (req: any, res: any) => {
  const category = new Category({
    ...req.body
  });
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", authenticate, async (req: any, res: any) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id/posts", authenticate, async (req: any, res: any) => {
  try {
    const posts = await Post.find({ category: req.params.id });
    res.send(posts);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
