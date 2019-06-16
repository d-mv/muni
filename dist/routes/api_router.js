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
// router.get("/photo", (req: any, res: any, next: any) => {
//  console.log(req.body)
//  console.log(req)
// });
exports["default"] = router;
