// import dbSeed from "../../db/db_seed";

const express = require("express");
const router = new express.Router();

// router.get("/seed", async (req: any, res: any) => {
//   try {
//     const seed = await dbSeed();
//     res.status(201).send({ message: seed });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

export default router
