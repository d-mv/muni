"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var compare_objects_1 = require("../modules/compare_objects");
var PostController = require("../controllers/post_controller");
var show_request_1 = require("../modules/show_request");
var router = express.Router();
// redirect to home for rest of routes
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
var replyCache = {
    create: { time: new Date(), req: "", reply: "" },
    update: { time: new Date(), req: "", reply: "" }
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
    // information
    console.log("\u00A7 update post...");
    show_request_1.showRequest("lcn.check", req.headers, [req.body, req.headers.token]);
    if (double("update", req.body, 600)) {
        console.log("~> consider double");
        res
            .status(replyCache["update"].reply.code)
            .send(replyCache["update"].reply);
    }
    else {
        var request = { token: req.headers.token, post: req.body.post };
        PostController.updatePost(request, function (controllerResponse) {
            caching("update", req.body, controllerResponse);
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
router.patch("/:id/vote", function (req, res, next) {
    var id = req.params.id;
    var user = req.query.user;
    PostController.vote({ id: id, user: user }, function (controllerResponse) {
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
    show_request_1.showRequest("loc.delete_post", req.headers, [
        req.params,
        req.headers.token,
        req.query
    ]);
    var request = {
        token: req.headers.token,
        post: req.params.id
    };
    PostController.deletePost(request, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
router.get("/:id/reply/vote", function (req, res, next) {
    show_request_1.showRequest("loc.reply_vote", req.headers, [
        req.params,
        req.headers.token,
        req.query
    ]);
    var request = __assign({ token: req.headers.token, post: req.params.id }, req.query);
    PostController.replyVote(request, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
exports["default"] = router;
