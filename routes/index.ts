const express = require("express");

import dbSeed from "../modules/db_seed";

const router = express.Router();

// ! seed the db with users/posts
router.get("/fake", (req: any, res: any, next: any) => {
  dbSeed((resp: any) => {
    res.send(resp);
  });
});
router.get("/cookie", (req: any, res: any, next: any) => {
  // console.log(req);
  const cookie_name = 'api_name'
  const cookie_value = ''
res.cookie(cookie_name, "muni_api").send("Cookie is set");

});
// rest
router.get("/*", (req: any, res: any, next: any) => {
  console.log(res)
  res.send();
});

export default router;
