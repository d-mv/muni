import { uploadPhoto } from "../../middleware/cloudinary";

const express = require("express");
const { ObjectID } = require("mongodb");

const router = new express.Router();

const News = require("../../models/news");

const authenticate = require("../../middleware/auth");

router.post("/", authenticate, async (req: any, res: any) => {
  const data = req.body;
  delete data._id;

  if (data.newsId === "") delete data.newsId;

  const { photo } = req.body;

  let photoUploaded = { secure_url: "" };
  if (photo) {
    delete data.photo;
    photoUploaded = await uploadPhoto(photo);
  }

  const photoLink = photoUploaded.secure_url ? photoUploaded.secure_url : "";

  const news = new News({
    ...data,
    photo: photoLink,
    location: req.user.location
  });

  try {
    if (data.pinned) {
      await News.updateOne(
        {
          location: req.user.location,
          pinned: true
        },
        { pinned: false }
      );
    }
    await news.save();
    const newsAll = await News.find({}).sort("-createdAt");
    res.status(201).send(newsAll);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.patch("/:id", authenticate, async (req: any, res: any) => {
  const _id = req.params.id;

  if (!ObjectID.isValid(_id)) {
    res.status(404).send();
  }
  const data: any = req.body;
console.log(data)
  const { photo } = data;

  let photoUploaded = { secure_url: "" };
  const startOfUrl = photo.split(":")[0];
  if (photo && (startOfUrl !== "http" || startOfUrl !== "htts")) {
    photoUploaded = await uploadPhoto(photo);
  }
  delete data.photo;
  data["photo"] = photoUploaded.secure_url;

  try {
    const news = await News.findOne({
      _id: req.params.id
    });

    if (!news) {
      res.status(404).send();
    }

    if (data.pinned) {
      await News.updateOne(
        {
          location: req.user.location,
          pinned: true
        },
        { pinned: false }
      );
    }
    const updates = Object.keys(data);
    updates.forEach(update => (news[update] = data[update]));
    await news.save();

    const newsAll = await News.find({}).sort("-createdAt");
    res.send(newsAll);
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
    const deletenews = await News.findOneAndDelete({
      _id: _id
    });
    if (!deletenews) {
      return res.status(404).send();
    }
    const news = await News.find({}).sort("-createdAt");
    res.send(news);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
export default router;
