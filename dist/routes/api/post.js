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
const cloudinary_1 = require("../../middleware/cloudinary");
const express = require("express");
const router = new express.Router();
const { ObjectID } = require("mongodb");
const Post = require("../../models/post");
const authenticate = require("../../middleware/auth");
router.post("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body;
    const { photo } = req.body;
    let photoUploaded = { secure_url: "" };
    if (photo) {
        delete data.photo;
        photoUploaded = yield cloudinary_1.uploadPhoto(photo);
    }
    const photoLink = photoUploaded.secure_url ? photoUploaded.secure_url : "";
    const post = new Post(Object.assign({}, req.body, { photo: photoLink, createdBy: req.user._id, location: req.user.location }));
    try {
        const result = yield post.save();
        const posts = yield Post.find({});
        res.status(201).send(sort_1.sortPosts(posts));
    }
    catch (error) {
        console.log(error);
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
// vote
router.get("/:id/vote", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const post = yield Post.findOne({
            _id: req.params.id
        });
        if (!post) {
            res.status(404).send();
        }
        post.votes = [...post.votes, req.user._id];
        yield post.save();
        const posts = yield Post.find({});
        res.send(sort_1.sortPosts(posts));
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
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
            _id: req.params.id
        });
        if (!post) {
            res.status(404).send();
        }
        updates.forEach(update => (post[update] = req.body[update]));
        yield post.save();
        const posts = yield Post.find({});
        res.send(sort_1.sortPosts(posts));
    }
    catch (error) {
        console.log(error);
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
            _id: _id
        });
        if (!deletepost) {
            return res.status(404).send();
        }
        const posts = yield Post.find({});
        res.send(sort_1.sortPosts(posts));
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=post.js.map