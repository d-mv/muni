const express = require("express");
import * as dotenv from "dotenv";
// import dbSeed from "../modules/db_seed";

const router = express.Router();

const dotEnv = dotenv.config();

// ! seed the db with users/posts
// router.get("/seed", (req: any, res: any, next: any) => {
//   dbSeed((resp: any) => {
//     res.send(resp);
//   });
// });

router.get("/photo", (req: any, res: any, next: any) => {
 console.log(req.body)
 console.log(req)
});

export default router;
