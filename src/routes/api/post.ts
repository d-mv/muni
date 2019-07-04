const expPost = require("express");
const routerPost = new expPost.Router();

const Post = require("../../models/post");

const authPost = require("../../middleware/auth");

routerPost.post("/posts", authPost, async (req: any, res: any) => {
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

module.exports = routerPost;
