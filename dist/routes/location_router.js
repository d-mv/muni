"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var show_request_1 = require("../modules/show_request");
var LocationController = require("../controllers/location_controller");
var PostController = require("../controllers/post_controller");
var security_1 = require("../modules/security");
var response_message_1 = require("../modules/response_message");
var router = express.Router();
var dotEnv = dotenv.config();
var redirectUrl = process.env.SELF || "httpL//localhost:8080";
var replyCache = {
    list: { time: new Date(), req: "", reply: "" }
    // login: { time: new Date(), req: "" },
    // id: { time: new Date(), req: "" },
    // posts: { time: new Date(), req: "" }
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
    // if return list
    if (req === "") {
        reply = diff < 1000 * time && cache.reply !== "" && cache.reply.status;
    }
    return reply;
};
// GET request of list of locations
router.get("/list", function (req, res, next) {
    // information
    console.log("\u00A7 get location list...");
    // showRequest("lcn.check", req.headers, [req.body, req.headers]);
    if (double("list", "", 600)) {
        console.log("~> consider double");
        res
            .status(replyCache["list"].reply.code)
            .send(replyCache["list"].reply);
    }
    else {
        LocationController.list(function (controllerResponse) {
            caching("list", "", controllerResponse);
            res.status(controllerResponse.code).send(controllerResponse);
        });
    }
});
// GET request for list of posts
router.get("/:id/posts", function (req, res, next) {
    show_request_1.showRequest("loc.get_posts", req.params.id, [req.body, req.headers.token]);
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
        ng(406, "Token is missing");
    }
    else {
        // token is present
        // check if token valid
        security_1.checkToken(req.headers.token, function (checkTokenResponse) {
            // reassign code
            var code = checkTokenResponse.code;
            delete checkTokenResponse.code;
            // check if code is not positive
            if (code !== 200) {
                // clear cookies  and send code/message
                ng(code, checkTokenResponse);
            }
            else {
                console.log(checkTokenResponse);
                PostController.posts({
                    location: req.params.id,
                    user: checkTokenResponse.payload.id,
                    level: checkTokenResponse.level || ""
                }, function (controllerResponse) {
                    res.status(controllerResponse.code).send(controllerResponse);
                });
            }
        }, true);
    }
});
// create
router.post("/create", function (req, res, next) {
    show_request_1.showRequest("loc.create", req.headers, [req.body, req.headers.token]);
    // if request is missing
    if (req.body === {}) {
        res.status(406).send({ status: false, message: "Wrong/malformed request" });
    }
    else {
        var ng_1 = function (code, packageToSend, message) {
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
            ng_1(406, "Token is missing");
        }
        else {
            // token is present
            // check if token valid
            security_1.checkToken(req.headers.token, function (checkTokenResponse) {
                // reassign code
                var code = checkTokenResponse.code;
                delete checkTokenResponse.code;
                // check if code is not positive
                if (code !== 200) {
                    // clear cookies  and send code/message
                    ng_1(code, checkTokenResponse);
                }
                else if (checkTokenResponse.level === "su") {
                    // if SU
                    LocationController.create(req.body, function (controllerResponse) {
                        res.status(controllerResponse.code).send(controllerResponse);
                    });
                }
                else {
                    // not authorized
                    res
                        .status(401)
                        .send(response_message_1.notAuthMessage("Only administrator can do that"));
                }
            });
        }
    }
});
// update
router.patch("/:id", function (req, res, next) {
    show_request_1.showRequest("loc.patch", req.headers, [req.body, req.headers.token]);
    // if request is missing
    if (req.body === {}) {
        res.status(406).send({
            status: false,
            message: "Wrong/malformed request"
        });
    }
    else {
        var ng_2 = function (code, packageToSend, message) {
            res
                .cookie("token", "", {
                expire: "",
                httpOnly: false,
                secure: false
            })
                .status(code)
                .send(packageToSend || {
                status: false,
                message: message
            });
        };
        // check if token is available
        if (!req.headers.token) {
            // if not present, clear cookies and send code/message
            ng_2(406, "Token is missing");
        }
        else {
            // token is present
            // check if token valid
            security_1.checkToken(req.headers.token, function (checkTokenResponse) {
                // reassign code
                console.log(checkTokenResponse);
                var code = checkTokenResponse.code;
                delete checkTokenResponse.code;
                // check if code is not positive
                if (code !== 200) {
                    // clear cookies  and send code/message
                    ng_2(code, checkTokenResponse);
                }
                else if (checkTokenResponse.level === "su") {
                    // if SU
                    LocationController.update(
                    // location, new data to update
                    req.params.id, req.body, function (controllerResponse) {
                        res.status(controllerResponse.code).send(controllerResponse);
                    });
                }
                else {
                    // not authorized
                    res
                        .status(401)
                        .send(response_message_1.notAuthMessage("Only administrator can do that"));
                }
            });
        }
    }
});
// delete
router["delete"]("/:id", function (req, res, next) {
    show_request_1.showRequest("loc_delete", req.headers, [req.body, req.headers.token]);
    // if request is missing
    if (req.body === {}) {
        res.status(406).send({
            status: false,
            message: "Wrong/malformed request"
        });
    }
    else {
        var ng_3 = function (code, packageToSend, message) {
            res
                .cookie("token", "", {
                expire: "",
                httpOnly: false,
                secure: false
            })
                .status(code)
                .send(packageToSend || {
                status: false,
                message: message
            });
        };
        // check if token is available
        if (!req.headers.token) {
            // if not present, clear cookies and send code/message
            ng_3(406, "Token is missing");
        }
        else {
            // token is present
            // check if token valid
            security_1.checkToken(req.headers.token, function (checkTokenResponse) {
                // reassign code
                console.log(checkTokenResponse);
                var code = checkTokenResponse.code;
                delete checkTokenResponse.code;
                // check if code is not positive
                if (code !== 200) {
                    // clear cookies  and send code/message
                    ng_3(code, checkTokenResponse);
                }
                else if (checkTokenResponse.level === "su") {
                    // if SU
                    LocationController.deleteLocation(req.params.id, function (controllerResponse) {
                        res.status(controllerResponse.code).send(controllerResponse);
                    });
                }
                else {
                    // not authorized
                    res
                        .status(401)
                        .send(response_message_1.notAuthMessage("Only administrator can do that"));
                }
            });
        }
    }
});
exports["default"] = router;
