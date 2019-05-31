const express = require("express");
import * as dotenv from "dotenv";

import { checkToken } from "../modules/security";
import * as User from "../models/user_model";
import dbSeed from "../modules/db_seed";
import { encodeString } from "../modules/security";

const router = express.Router();
const dotEnv = dotenv.config();
const redirectUrl = process.env.SELF || "httpL//localhost:8080";

// ! seed the db with users/posts
// router.get("/fake", (req: any, res: any, next: any) => {
//   dbSeed((resp: any) => {
//     res.send(resp);
//   });
// });

// rest
router.get("/*", (req: any, res: any, next: any) => {
  console.log("ind-redir");
  res.redirect(308, redirectUrl);
});
router.post("/*", (req: any, res: any, next: any) => {
  console.log("ind-redir");
  res.redirect(308, redirectUrl);
});

export default router;
