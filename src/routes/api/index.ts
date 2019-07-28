import dbSeed from "../../db/db_seed";
import { deletePhoto } from "../../middleware/cloudinary";

const express = require("express");
const router = new express.Router();

router.get("/seed", async (req: any, res: any) => {
  try {
    const seed = await dbSeed();
    res.status(201).send({ message: seed });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/image", async (req: any, res: any) => {
  const { link } = req.body;
  if (link) {
    try {
      const result = await deletePhoto(link);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

export default router;
