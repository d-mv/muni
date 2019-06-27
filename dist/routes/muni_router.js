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
var UserController = require("../controllers/user_controller");
var security_1 = require("../modules/security");
var router = express.Router();
var dotEnv = dotenv.config();
var token = "";
var options = {
    expire: "",
    httpOnly: false,
    secure: false
};
var replyCache = {
    check: { time: new Date(), req: "", reply: {} },
    // create: { time: new Date(), req: "" },
    login: { time: new Date(), req: "", reply: {} },
    update: { time: new Date(), req: "", reply: {} },
    data: { time: new Date(), req: "", reply: {} }
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
router.get("/login", function (req, res, next) {
    // information
    console.log("\u00A7 muni logging in: " + req.query);
    // showRequest("usr.login", req.headers, [req.body, req.headers]);
    if (double("login", req.query, 60)) {
        console.log("~> consider double");
        res.status(replyCache["login"].reply.code).send(replyCache["login"].reply);
    }
    else {
        UserController.muniLogin({
            query: req.query
        }, function (controllerResponse) {
            console.log("controllerResponse");
            console.log(controllerResponse);
            if (controllerResponse.status) {
                // process token/cookie
                var cookieIngredients = {
                    code: controllerResponse.code,
                    status: controllerResponse.status,
                    message: controllerResponse.message,
                    payload: {
                        _id: controllerResponse.payload._id
                    }
                };
                var response = security_1.cookieFactory(cookieIngredients);
                var packageToSend = {
                    code: response.code,
                    message: response.message.message,
                    status: response.message.status,
                    token: response.token,
                    payload: __assign({}, controllerResponse.payload)
                };
                caching("login", req.query, packageToSend);
                res.status(response.code).send(packageToSend);
            }
            else {
                caching("login", req.query, controllerResponse);
                res.status(controllerResponse.code).send(controllerResponse);
            }
        });
    }
});
exports["default"] = router;
