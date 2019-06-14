"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
// import dbSeed from "../modules/db_seed";
var router = express.Router();
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
// ! seed the db with users/posts
// router.get("/seed", (req: any, res: any, next: any) => {
//   dbSeed((resp: any) => {
//     res.send(resp);
//   });
// });
// rest
// router.get("/*", (req: any, res: any, next: any) => {
//   res.redirect(308, redirectUrl);
// });
// router.post("/*", (req: any, res: any, next: any) => {
//   res.redirect(308, redirectUrl);
// });
exports["default"] = router;
