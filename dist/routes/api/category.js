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
const Category = require("../../models/category");
const Post = require("../../models/post");
const authenticate = require("../../middleware/auth");
router.post("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const category = new Category(Object.assign({}, req.body));
    try {
        yield category.save();
        res.status(201).send(category);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.get("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const categories = yield Category.find({});
        res.send(categories);
    }
    catch (error) {
        res.status(500).send();
    }
}));
router.get("/:id/posts", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const posts = yield Post.find({ category: req.params.id });
        res.send(posts);
    }
    catch (error) {
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=category.js.map