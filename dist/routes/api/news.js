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
const cloudinary_1 = require("../../middleware/cloudinary");
const express = require("express");
const { ObjectID } = require("mongodb");
const router = new express.Router();
const News = require("../../models/news");
const authenticate = require("../../middleware/auth");
router.post("/", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body;
    delete data._id;
    if (data.newsId === "")
        delete data.newsId;
    const { photo } = req.body;
    let photoUploaded = { secure_url: "" };
    if (photo) {
        delete data.photo;
        photoUploaded = yield cloudinary_1.uploadPhoto(photo);
    }
    const photoLink = photoUploaded.secure_url ? photoUploaded.secure_url : "";
    const news = new News(Object.assign({}, data, { photo: photoLink, location: req.user.location }));
    try {
        if (data.pinned) {
            yield News.updateOne({
                location: req.user.location,
                pinned: true
            }, { pinned: false });
        }
        yield news.save();
        const newsAll = yield News.find({}).sort("-createdAt");
        res.status(201).send(newsAll);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}));
router.patch("/:id", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    const data = req.body;
    const { photo } = data;
    let photoUploaded = { secure_url: "" };
    const startOfUrl = photo.split(":")[0];
    if (photo && (startOfUrl !== "http" || startOfUrl !== "htts")) {
        photoUploaded = yield cloudinary_1.uploadPhoto(photo);
    }
    delete data.photo;
    data["photo"] = photoUploaded.secure_url;
    try {
        const news = yield News.findOne({
            _id: req.params.id
        });
        if (!news) {
            res.status(404).send();
        }
        if (data.pinned) {
            yield News.updateOne({
                location: req.user.location,
                pinned: true
            }, { pinned: false });
        }
        const updates = Object.keys(data);
        updates.forEach(update => (news[update] = data[update]));
        yield news.save();
        const newsAll = yield News.find({}).sort("-createdAt");
        res.send(newsAll);
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
        const deletenews = yield News.findOneAndDelete({
            _id: _id
        });
        if (!deletenews) {
            return res.status(404).send();
        }
        const news = yield News.find({}).sort("-createdAt");
        res.send(news);
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
exports.default = router;
//# sourceMappingURL=news.js.map