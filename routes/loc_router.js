"use strict";
exports.__esModule = true;
var express_1 = require("express");
var show_request_1 = require("../modules/show_request");
var LocationController = require("../controllers/location_controller");
var router = express_1["default"].Router();
// GET request of list of locations
router.get("/list", function (req, res, next) {
    show_request_1.showRequest(req.headers, req.query);
    var token = req.headers.token ? req.headers.token.toString() : "";
    LocationController.list({ query: req.query, token: token }, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
// GET request for list of posts
router.get("/:id/posts", function (req, res, next) {
    show_request_1.showRequest(req.headers, [req.query, req.params.id]);
    var token = req.headers.token ? req.headers.token.toString() : "";
    LocationController.posts({ query: { location: req.params.id, options: req.query }, token: token }, function (controllerResponse) {
        res.status(controllerResponse.code).send(controllerResponse);
    });
});
// router.get("/create", (req, res, next) => {
//   showRequest(req.headers, req.query);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.create(
//     { query: req.query, token: token },
//     (controllerResponse: apiResponseTYPE) => {
//       res.send(controllerResponse);
//     }
//   );
// });
// // check if token login available
// router.get("/check", (req, res, next) => {
//   showRequest(req.headers, req.query);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.check(token, (controllerResponse: apiResponseTYPE) => {
//     res.send(controllerResponse);
//   });
// });
// get
// router.get("/:id", (req, res, next) => {
//   showRequest(req.headers, req.params.id);
//   const token = req.headers.token ? req.headers.token.toString() : "";
//   LocationController.get(
//     { id: req.params.id, token: token },
//     (controllerResponse: apiResponseTYPE) => {
//       res.send(controllerResponse);
//     }
//   );
// });
// rest
router.get("/*", function (req, res, next) {
    res.send();
});
exports["default"] = router;
