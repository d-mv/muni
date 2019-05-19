"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
// ! seed the db with users/posts
// router.get("/fake", (req, res, next) => {
//   dbSeed((resp: any) => {
//     res.send(resp);
//   });
// });
// rest
router.get("/*", function (req, res, next) {
    res.send();
});
exports["default"] = router;
