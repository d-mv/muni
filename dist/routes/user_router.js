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
var show_request_1 = require("../modules/show_request");
var router = express.Router();
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
// set defaults
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
// fetch data
router.get("/data", function (req, res, next) {
    // information
    console.log("\u00A7 checking token: " + (req.headers.token ? "present" : "absent"));
    // showRequest("usr.check", req.headers, [req.body, req.headers.token]);
    // check if token is present
    if (!req.headers.token) {
        // if not present, clear cookies and send code/message
        res
            .cookie("token", "", {
            expire: "",
            httpOnly: false,
            secure: false
        })
            .status(400)
            .send({
            status: false,
            message: "Token is missing"
        });
    }
    else {
        // token is present
        if (double("data", req.headers.token, 3)) {
            console.log("~> consider double");
            res.status(replyCache["data"].reply.code).send(replyCache["data"].reply);
        }
        else {
            console.log("check if token valid");
            // check if token valid
            security_1.checkToken(req.headers.token, function (checkTokenResponse) {
                var tmp = checkTokenResponse;
                // reassign code
                var code = checkTokenResponse.code;
                delete checkTokenResponse.code;
                // check if code is not positive
                if (code !== 200) {
                    // clear cookies & send code/message
                    res.cookie("token", token, options);
                }
                var packageToSend = {
                    code: code,
                    status: checkTokenResponse.status,
                    payload: checkTokenResponse.payload
                };
                caching("data", req.headers.token, packageToSend);
                res.status(code).send(packageToSend);
            });
        }
    }
});
// verify email address
router.get("/verify", function (req, res, next) {
    var id = req.query.id;
    // information
    console.log("\u00A7 verify email for: " + id);
    // showRequest("usr.check", req.headers, [req.body, id]);
    // check if ID is present
    if (!id) {
        // if not present, send code/message
        res.status(400).send({
            status: false,
            code: 400,
            message: "ID is missing"
        });
    }
    else {
        // ID is present
        if (double("check", id, 60)) {
            console.log("~> consider double");
            res
                .status(replyCache["check"].reply.code)
                .send(replyCache["check"].reply);
        }
        else {
            // check the request
            UserController.verify(id, function (controllerResponse) {
                caching("check", id, controllerResponse);
                res.status(controllerResponse.code).send(controllerResponse);
            });
        }
    }
});
// update
router.post("/:id/update", function (req, res, next) {
    var id = req.params.id;
    var query = req.query;
    // information
    console.log("\u00A7 update user #: " + id + " with " + Object.keys(query));
    // showRequest("usr.check", req.headers, [req.body, id]);
    // check if ID is present
    if (!id || !query || id.length !== 24) {
        // if not present, send code/message
        res.status(400).send({
            status: false,
            code: 400,
            message: "ID and/or query is missing"
        });
    }
    else {
        // ID is present
        if (double("update", id, 3)) {
            console.log("~> consider double");
            res
                .status(replyCache["update"].reply.code)
                .send(replyCache["update"].reply);
        }
        else {
            // check the request
            UserController.update(id, query, function (controllerResponse) {
                caching("update", id, controllerResponse);
                res.status(controllerResponse.code).send(controllerResponse);
            });
        }
    }
});
// check if token valid
router.get("/check", function (req, res, next) {
    // information
    console.log("\u00A7 checking token: " + (req.headers.token ? "present" : "absent"));
    // showRequest("usr.check", req.headers, [req.body, req.headers.token]);
    // check if token is present
    if (!req.headers.token) {
        // if not present, clear cookies and send code/message
        res
            .cookie("token", "", {
            expire: "",
            httpOnly: false,
            secure: false
        })
            .status(400)
            .send({
            status: false,
            message: "Token is missing"
        });
    }
    else {
        // token is present
        if (double("check", req.headers.token, 60)) {
            console.log("~> consider double");
            res
                .status(replyCache["check"].reply.code)
                .send(replyCache["check"].reply);
        }
        else {
            // check if token valid
            security_1.checkToken(req.headers.token, function (checkTokenResponse) {
                var tmp = checkTokenResponse;
                // reassign code
                var code = checkTokenResponse.code;
                delete checkTokenResponse.code;
                // check if code is not positive
                if (code !== 200) {
                    // clear cookies & send code/message
                    res.cookie("token", token, options);
                }
                // console.log(object)
                var packageToSend = {
                    code: code,
                    message: checkTokenResponse.message + " / " + checkTokenResponse.message,
                    status: checkTokenResponse.status,
                    payload: checkTokenResponse.token
                    // payload: checkTokenResponse.payload
                };
                caching("check", req.headers.token, packageToSend);
                res.status(code).send(packageToSend);
            });
        }
    }
});
// create user
router.post("/create", function (req, res, next) {
    console.log("create");
    show_request_1.showRequest("usr.create", req.headers, [req.body, req.query]);
    UserController.create(req.query, function (controllerResponse) {
        if (controllerResponse.status) {
            // created, need to issue token
            // console.log(controllerResponse);
            var cookie = controllerResponse.payload.cookie;
            delete controllerResponse.payload.cookie;
            res
                .cookie("token", cookie.token, cookie.options)
                .status(cookie.code)
                .send(__assign({}, controllerResponse, { code: cookie.code }));
        }
        else {
            res.status(controllerResponse.code).send(controllerResponse);
        }
    });
});
// login
router.get("/login", function (req, res, next) {
    // information
    console.log("\u00A7 logging in: " + req.query);
    // showRequest("usr.login", req.headers, [req.body, req.headers]);
    if (double("login", req.query, 60)) {
        console.log("~> consider double");
        res.status(replyCache["login"].reply.code).send(replyCache["login"].reply);
    }
    else {
        UserController.login({
            query: req.query
        }, function (controllerResponse) {
            console.log("controllerResponse");
            // console.log(controllerResponse);
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
                //  console.log("cookieFactory Response");
                //  console.log(response.message);
                //  console.log(Object.keys(response));
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
// get user
router.get("/:id", function (req, res, next) {
    // console.log("id");
    show_request_1.showRequest("usr.id", req.headers, [req.body, req.headers.token]);
    var ng = function (code, packageToSend, message) {
        res
            .cookie("token", "", {
            expire: "",
            httpOnly: false,
            secure: false
        })
            .status(code)
            .send(packageToSend || { status: false, message: message });
    };
    // check if token is available
    if (!req.headers.token) {
        // if not present, clear cookies and send code/message
        ng(400, "Token is missing");
    }
    else {
        // token is present
        // check if token valid
        security_1.checkToken(req.headers.token, function (checkTokenResponse, id) {
            // console.log(id);
            // reassign code
            var code = checkTokenResponse.code;
            delete checkTokenResponse.code;
            // check if code is not positive
            if (code !== 200) {
                // clear cookies  and send code/message
                ng(code, checkTokenResponse);
            }
            else {
                UserController.get({ id: req.params.id, userRequested: id }, function (controllerResponse) {
                    if (controllerResponse.payload)
                        delete controllerResponse.payload;
                    res.status(controllerResponse.code).send(controllerResponse);
                });
            }
        });
    }
});
// get user's posts
router.get("/:id/posts", function (req, res, next) {
    console.log("id with posts");
    show_request_1.showRequest("usr.posts", req.headers, [req.body, req.headers.token]);
    var ng = function (code, packageToSend, message) {
        res
            .cookie("token", "", {
            expire: "",
            httpOnly: false,
            secure: false
        })
            .status(code)
            .send(packageToSend || { status: false, message: message });
    };
    // check if token is available
    if (!req.headers.token) {
        // if not present, clear cookies and send code/message
        ng(400, "Token is missing");
    }
    else {
        // token is present
        // check if token valid
        security_1.checkToken(req.headers.token, function (checkTokenResponse) {
            // console.log(checkTokenResponse);
            // reassign code
            var code = checkTokenResponse.code;
            delete checkTokenResponse.code;
            // check if code is not positive
            if (code !== 200) {
                // clear cookies  and send code/message
                ng(code, checkTokenResponse);
            }
            else {
                UserController.get({ id: req.params.id, userRequested: checkTokenResponse.payload.id }, function (controllerResponse) {
                    res.status(controllerResponse.code).send(controllerResponse);
                });
            }
        });
    }
});
exports["default"] = router;
