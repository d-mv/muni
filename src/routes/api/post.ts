import { sortPosts } from "../../modules/sort";
import { uploadPhoto } from "../../middleware/cloudinary";

const express = require("express");
const router = new express.Router();
const { ObjectID } = require("mongodb");

const Post = require("../../models/post");

const authenticate = require("../../middleware/auth");

router.post("/", authenticate, async (req: any, res: any) => {
  const data = req.body;
  const { photo } = req.body;

  let photoUploaded = { secure_url: "" };
  if (photo) {
    delete data.photo;
    photoUploaded = await uploadPhoto(photo);
  }

  const photoLink = photoUploaded.secure_url ? photoUploaded.secure_url : "";

  const post = new Post({
    ...req.body,
    photo: photoLink,
    createdBy: req.user._id,
    location: req.user.location
  });

  try {
    const result = await post.save();
    const posts = await Post.find({});
    res.status(201).send(sortPosts(posts));
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.get("/:id", authenticate, async (req: any, res: any) => {
  try {
    const post = await Post.find({ _id: req.params.id });
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});
// vote
router.get("/:id/vote", authenticate, async (req: any, res: any) => {
  const _id = req.params.id;

  if (!ObjectID.isValid(_id)) {
    res.status(404).send();
  }
  try {
    const post = await Post.findOne({
      _id: req.params.id
    });

    if (!post) {
      res.status(404).send();
    }
    post.votes = [...post.votes, req.user._id];
    await post.save();
    const posts = await Post.find({});
    res.send(sortPosts(posts));
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.patch("/:id", authenticate, async (req: any, res: any) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  if (!ObjectID.isValid(_id)) {
    res.status(404).send();
  }
  try {
    const post = await Post.findOne({
      _id: req.params.id
    });

    if (!post) {
      res.status(404).send();
    }
    updates.forEach(update => (post[update] = req.body[update]));

    await post.save();

    const posts = await Post.find({});
    res.send(sortPosts(posts));
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.delete("/:id", authenticate, async (req: any, res: any) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }
  try {
    const deletepost = await Post.findOneAndDelete({
      _id: _id
    });
    if (!deletepost) {
      return res.status(404).send();
    }
    const posts = await Post.find({});
    res.send(sortPosts(posts));
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
export default router;
