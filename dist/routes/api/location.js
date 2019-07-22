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
const sort_1 = require("../../modules/sort");
const express = require("express");
const router = new express.Router();
const Location = require("../../models/location");
const Post = require("../../models/post");
const News = require("../../models/news");
const authenticate = require("../../middleware/auth");
router.post("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const post = new Location(Object.assign({}, req.body));
    try {
        yield post.save();
        res.status(201).send(post);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const locations = yield Location.find({});
        res.send(locations);
    }
    catch (error) {
        res.status(500).send();
    }
}));
router.get("/:id/posts-photos", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const posts = yield Post.find({ location: req.params.id }).select("-photo");
        res.send(sort_1.sortPosts(posts));
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
router.get("/:id/posts", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const posts = yield Post.find({ location: req.params.id });
        res.send(sort_1.sortPosts(posts));
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
router.get("/:id/news", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const news = yield News.find({ location: req.params.id }).sort("-createdAt");
        res.send(news);
    }
    catch (error) {
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=location.js.map