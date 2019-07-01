"use strict";
exports.__esModule = true;
var express = require("express");
var index_1 = require("../controllers/index");
var Message = require("../modules/response_message");
var router = express.Router();
var replyCache = {
    check: { time: new Date(), req: "", reply: {} },
    login: { time: new Date(), req: "", reply: {} }
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
    var reply = diff < 1000 * time && cache.reply !== "" && req === cache.req;
    if (typeof req === "object" && cache.req != "") {
        var cachedLength = Object.keys(cache.req).length;
        var reqLength = Object.keys(req).filter(function (key) { return req[key] === cache.req[key]; }).length;
        reply = diff < 1000 * time && cachedLength === reqLength;
    }
    return reply;
};
// headers.token
router.get("/check", function (req, res, next) {
    console.log(">> checking token: " + req.headers.token);
    if (double("check", req.headers.token, 5)) {
        console.log("~> consider double");
        var _a = replyCache["check"].reply, status_1 = _a.status, message = _a.message, payload = _a.payload;
        res.status(replyCache["check"].reply.code).send({
            status: status_1,
            message: message,
            payload: payload
        });
    }
    else {
        index_1.checkUserById(req.headers.token, function (rsp) {
            caching("check", req.headers.token, rsp);
            res.status(rsp.code).send({
                status: rsp.status,
                message: rsp.message,
                payload: rsp.payload
            });
        });
    }
});
router.get("/user/login", function (req, res, next) {
    console.log(">> loggin in: ");
    console.log(req.query);
    if (typeof req.query.email === "undefined" ||
        typeof req.query.password === "undefined") {
        res.status(400).send(Message.requestError("Missing email/password"));
    }
    else {
        index_1.login(req.query, function (rsp) {
            return res.status(rsp.code).send({
                status: rsp.status,
                message: rsp.message,
                payload: rsp.payload
            });
        });
    }
});
exports["default"] = router;
