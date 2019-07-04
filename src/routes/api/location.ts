const expLocation = require("express");
const routerLocation = new expLocation.Router();

const Place = require("../../models/location");

const authLocation = require("../../middleware/auth");

routerLocation.post("/", authLocation, async (req: any, res: any) => {
  const post = new Place({
    ...req.body
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});
routerLocation.get("/", async (req: any, res: any) => {
  try {
    const locations = await Place.find({});
    res.send(locations);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = routerLocation;
