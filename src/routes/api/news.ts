const express = require("express");
const router = new express.Router();

const News = require("../../models/news");

const authenticate = require("../../middleware/auth");

router.post("/", authenticate, async (req: any, res: any) => {
  const post = new News({
    ...req.body,
    location: req.user.location
  });
  try {
    if (req.body.pinned) {
      const update = await News.updateOne({
        location: req.user.location,
        pinned: true
      }, { pinned: true });
    }
    await post.save();
    const news = await News.find({}).sort("-createdAt");
    res.status(201).send(news);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
