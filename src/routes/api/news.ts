const expNews = require("express");
const routerNews = new expNews.Router();

const News = require("../../models/news");

const authNews = require("../../middleware/auth");

routerNews.post("/", authNews, async (req: any, res: any) => {
  const post = new News({
    ...req.body
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = routerNews;
