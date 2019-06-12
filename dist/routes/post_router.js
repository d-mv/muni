"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var compare_objects_1 = require("../modules/compare_objects");
var PostController = require("../controllers/post_controller");
var router = express.Router();
// redirect to home for rest of routes
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
var replyCache = {
    create: { time: new Date(), req: "", reply: "" }
};
// storing
var caching = function (cacheId, req, reply) {
    var time = new Date();
    replyCache[cacheId] = { time: time, req: req, reply: reply };
};
// check if request is double
var double = function (cacheId, req, time) {
    var cache = replyCache[cacheId];
    var last = cache.time;
    var now = new Date();
    var diff = now - last;
    var reply = diff < 1000 * time && cache.reply !== "" && compare_objects_1["default"](req, cache.req);
    // if return list
    if (req === "") {
        reply = diff < 1000 * time && cache.reply !== "";
    }
    return reply;
};
/**
 * Route to create post, using POST method with object in body
 */
router.post("/create", function (req, res, next) {
    // information
    console.log("\u00A7 create post...");
    // showRequest("lcn.check", req.headers, [req.body, req.headers]);
    if (double("create", req.body, 600)) {
        console.log("~> consider double");
        res
            .status(replyCache["create"].reply.code)
            .send(replyCache["create"].reply);
    }
    else {
        PostController.createPost(req.body, function (controllerResponse) {
            caching("create", req.body, controllerResponse);
            res.status(controllerResponse.code).send(controllerResponse);
        });
    }
});
/**
 * Route to update post, using PATCH method with object in body
 * @function router.patch
 * @param {object} req - Post ID in parameters + token in header
 * @param {object} res
 * @param {object} next
 */
router.patch("/:id", function (req, res, next) {
    PostController.updatePost(req, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
/**
 * Route to delete post, using DELETE method
 * @function router.delete
 * @param {object} req - Post ID in parameters + token in header
 * @param {object} res
 * @param {object} next
 */
router["delete"]("/:id", function (req, res, next) {
    PostController.deletePost(req, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
// rest
router.get("/*", function (req, res, next) {
    console.log("post-redir");
    res.redirect(308, redirectUrl);
});
router.post("/*", function (req, res, next) {
    console.log("post-redir");
    res.redirect(308, redirectUrl);
});
exports["default"] = router;
