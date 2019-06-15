"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var db_seed_1 = require("../modules/db_seed");
var router = express.Router();
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
// ! seed the db with users/posts
router.get("/seed", function (req, res, next) {
    db_seed_1["default"](function (resp) {
        res.send(resp);
    });
});
router.get("/photo", function (req, res, next) {
    console.log(req.body);
    console.log(req);
});
exports["default"] = router;
