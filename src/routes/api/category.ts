const expCategory = require("express");
const routerCategory = new expCategory.Router();

const Category = require("../../models/category");
const PostC = require("../../models/post");

const authCategory = require("../../middleware/auth");

routerCategory.post("/", authCategory, async (req: any, res: any) => {
  const post = new Category({
    ...req.body
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

routerCategory.get("/", async (req: any, res: any) => {
  try {
    const Categories = await Category.find({});
    res.send(Categories);
  } catch (error) {
    res.status(500).send();
  }
});
routerCategory.get("/:id/posts", authCategory, async (req: any, res: any) => {
  try {
    const Posts = await PostC.find({ category: req.params.id });
    res.send(Posts);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = routerCategory;
