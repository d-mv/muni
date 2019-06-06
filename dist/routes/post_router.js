"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var PostController = require("../controllers/post_controller");
var router = express.Router();
// redirect to home for rest of routes
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
/**
 * Route to create post, using POST method with object in body
 *
 * @function router.post
 * @param {object} req - Post ID in header, data in body
 * @param {object} res
 * @param {object} next
 *
 */
router.post("/create", function (req, res, next) {
    PostController.createPost(req, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
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
