"use strict";
exports.__esModule = true;
var express_1 = require("express");
var show_request_1 = require("../modules/show_request");
var UsersController = require("../controllers/user_controller");
var router = express_1["default"].Router();
// login
router.get("/login", function (req, res, next) {
    console.log("login");
    show_request_1.showRequest(req.headers, req.query);
    var token = req.headers.token ? req.headers.token.toString() : "";
    UsersController.login({ query: req.query, token: token }, function (controllerResponse) {
        res.send(controllerResponse);
    });
});
// rest
router.get("/*", function (req, res, next) {
    res.send({ status: true, message: "Welcome to the API" });
});
exports["default"] = router;
