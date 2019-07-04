const express = require("express");
const router = new express.Router();

const User = require("../../models/user");
const Post = require("../../models/post");

const authenticate = require("../../middleware/auth");

router.post("/", async (req: any, res: any) => {
  const user = new User(req.body);
  try {
    const token = await user.newAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const user = await User.checkValidCredentials(
      req.body.email,
      req.body.pass
    );
    const token = await user.newAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
});

router.post("/logout", authenticate, async (req: any, res: any) => {
  try {
    req.user.tokens = req.user.tokens.filter((token: any) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/logoutall", authenticate, async (req: any, res: any) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id/posts", authenticate, async (req: any, res: any) => {
  try {
    const userPosts = await Post.find({ createdBy: req.params.id });
    res.send(userPosts);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
