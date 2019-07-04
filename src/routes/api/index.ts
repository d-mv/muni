import dbSeed from "../../db/db_seed";

const expSeed = require("express");
const routeSeed = new expSeed.Router();

routeSeed.get("/seed", async (req: any, res: any) => {
  try {
    dbSeed();
    res.status(201).send({ message: "Seed is done OK" });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = routeSeed;
