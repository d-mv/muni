const express = require("express");
const router = new express.Router();
const { ObjectID } = require("mongodb");

const Post = require("../../models/post");

const authPost = require("../../middleware/auth");

router.post("/", authPost, async (req: any, res: any) => {
  const post = new Post({
    ...req.body,
    createdBy: req.user._id
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.patch("/:id", authPost, async (req: any, res: any) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  if (!ObjectID.isValid(_id)) {
    res.status(404).send();
  }
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!post) {
      res.status(404).send();
    }

    updates.forEach(update => (post[update] = req.body[update]));
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/:id", authPost, async (req: any, res: any) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  try {
    const deletepost = await Post.findOneAndDelete({
      _id: _id,
      author: req.user._id
    });
    if (!deletepost) {
      return res.status(404).send();
    }
    res.send(deletepost);
  } catch (error) {
    res.status(500).send();
  }
});
export default router;