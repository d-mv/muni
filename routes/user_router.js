"use strict";
exports.__esModule = true;
var express_1 = require("express");
var UsersController = require("../controllers/user_controller");
var show_request_1 = require("../modules/show_request");
var router = express_1["default"].Router();
// create user
router.get("/create", function (req, res, next) {
    console.log('create');
    show_request_1.showRequest(req.headers, req.query);
    var token = req.headers.token ? req.headers.token.toString() : '';
    UsersController.create({ query: req.query, token: token }, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
// check if token login available
router.get("/check", function (req, res, next) {
    console.log("check");
    show_request_1.showRequest(req.headers, req.query);
    var token = req.headers.token ? req.headers.token.toString() : '';
    UsersController.check(token, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
// get user
router.get("/:id", function (req, res, next) {
    console.log("id");
    show_request_1.showRequest(req.headers, req.params.id);
    var token = req.headers.token ? req.headers.token.toString() : '';
    UsersController.get({ id: req.params.id, token: token }, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
exports["default"] = router;
