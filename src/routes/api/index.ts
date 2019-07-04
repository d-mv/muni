import dbSeed from "../../db/db_seed";

const express = require("express");
const router = new express.Router();

router.get("/seed", async (req: any, res: any) => {
  try {
    dbSeed();
    res.status(201).send({ message: "Seed is done OK" });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router
