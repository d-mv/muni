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
const { ObjectID } = require("mongodb");
const Post = require("../../models/post");
const authenticate = require("../../middleware/auth");
router.post("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const post = new Post(Object.assign({}, req.body, { createdBy: req.user._id }));
    try {
        yield post.save();
        res.status(201).send(post);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.get("/:id", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const post = yield Post.find({ _id: req.params.id });
        res.status(201).send(post);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.patch("/:id", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const post = yield Post.findOne({
            _id: req.params.id,
            author: req.user._id
        });
        if (!post) {
            res.status(404).send();
        }
        updates.forEach(update => (post[update] = req.body[update]));
        yield post.save();
        res.send(post);
    }
    catch (error) {
        res.status(400).send();
    }
}));
router.delete("/:id", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const deletepost = yield Post.findOneAndDelete({
            _id: _id,
            author: req.user._id
        });
        if (!deletepost) {
            return res.status(404).send();
        }
        res.send(deletepost);
    }
    catch (error) {
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=post.js.map