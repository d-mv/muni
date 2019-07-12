const express = require("express");
const router = new express.Router();

const Location = require("../../models/location");
const Post = require('../../models/post')
const News = require('../../models/news')

const authenticate = require("../../middleware/auth");

router.post("/", authenticate, async (req: any, res: any) => {
  const post = new Location({
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
    const locations = await Location.find({});
    res.send(locations);
  } catch (error) {
    res.status(500).send();
  }
});
router.get("/:id/posts", authenticate, async (req: any, res: any) => {
  try {
    const posts = await Post.find({ location: req.params.id });
    res.send(posts);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id/news", authenticate, async (req: any, res: any) => {
  try {
    const news = await News.find({ location: req.params.id });
    res.send(news);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;