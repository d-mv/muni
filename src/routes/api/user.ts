import { ObjectID } from "mongodb";
import sendEmail from "../../modules/send_mail";
const express = require("express");
const router = new express.Router();

const User = require("../../models/user");
const Post = require("../../models/post");

const authenticate = require("../../middleware/auth");
const data = require("../../data/data.json");
const translation: { [index: string]: any } = data;

router.post("/", async (req: any, res: any) => {
  const user = new User(req.body);
  try {
    const token = await user.newAuthToken();
    // send confirmation mail
    const url = `http://localhost:8080/user/verify?id=${token}`;
    // const send =  sendEmail(email, url, language);
    const send = await sendEmail(user.email, url, user.settings.language);
    const messages = user.lang ? translation[user.lang] : translation["עב"];
    //.assign message
    const message = messages.user.verificationMessageSent;

    res.status(201).send({ message });
  } catch (e) {
    res.status(400).send(e.errmsg ? e.errmsg : e);
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const user = await User.checkValidCredentials(
      req.body.email,
      req.body.pass
    );
    if (user.status) {
      const token = await user.newAuthToken();
      res.send({ user, token });
    } else {
      const messages = user.lang ? translation[user.lang] : translation["עב"];
      //.assign message
      const message = messages.user.notVerified;
      // send mail with link
      res.send({ message: message });
    }
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
});
router.get("/check", authenticate, async (req: any, res: any) => {
  try {
    const { type, location, _id, settings } = req.user;
    res.send({
      user: { type, location, _id, settings }
    });
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
router.patch("/settings", authenticate, async (req: any, res: any) => {
  console.log("hello");
  const { _id } = req.user;
  const updates = Object.keys(req.body);
  console.log(_id);
  if (!ObjectID.isValid(_id)) {
    res.status(404).send();
  }
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      res.status(404).send();
    }
    updates.forEach(update => (user.settings[update] = req.body[update]));
    console.log(user);
    await user.save();

    res.send(user);
  } catch (error) {
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
    const user = await User.findOne({ _id });

    if (!user) {
      res.status(404).send();
    }
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

export default router;
