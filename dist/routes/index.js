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
// rest
router.get("/*", function (req, res, next) {
    console.log("ind-redir");
    res.redirect(308, redirectUrl);
});
router.post("/*", function (req, res, next) {
    console.log("ind-redir");
    res.redirect(308, redirectUrl);
});
exports["default"] = router;
