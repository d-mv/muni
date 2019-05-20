const express = require("express");

import dbSeed from "../modules/db_seed";

const router = express.Router();

// ! seed the db with users/posts
router.get("/fake", (req: any, res: any, next: any) => {
  dbSeed((resp: any) => {
    res.send(resp);
  });
});

// rest
router.get("/*", (req:any, res:any, next:any) => {
  res.send();
});

export default router;
