"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = new express.Router();
const News = require("../../models/news");
const authenticate = require("../../middleware/auth");
router.post("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const post = new News(Object.assign({}, req.body, { location: req.user.location }));
    try {
        yield post.save();
        const news = yield News.find({});
        res.status(201).send(news);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}));
exports.default = router;
//# sourceMappingURL=news.js.map