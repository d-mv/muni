import express from "express";
import dbSeed from "../modules/db_seed";
const router = express.Router();

// ! seed the db with users/posts
// router.get("/fake", (req, res, next) => {
//   dbSeed((resp: any) => {
//     res.send(resp);
//   });
// });

// rest
router.get("/*", (req, res, next) => {
  res.send();
});

export default router;
