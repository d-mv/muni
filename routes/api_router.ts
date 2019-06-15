const express = require("express");
import * as dotenv from "dotenv";
import dbSeed from "../modules/db_seed";

const router = express.Router();

const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

// ! seed the db with users/posts
router.get("/seed", (req: any, res: any, next: any) => {
  dbSeed((resp: any) => {
    res.send(resp);
  });
});

export default router;
