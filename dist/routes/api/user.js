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
const mongodb_1 = require("mongodb");
const send_mail_1 = require("../../modules/send_mail");
const express = require("express");
const router = new express.Router();
const User = require("../../models/user");
const Post = require("../../models/post");
const authenticate = require("../../middleware/auth");
const data = require("../../data/data.json");
const translation = data;
router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = new User(req.body);
    try {
        const token = yield user.newAuthToken();
        // send confirmation mail
        const url = `https://muni-dev.herokuapp.com/user/verify?id=${token}`;
        // const send =  sendEmail(email, url, language);
        const send = yield send_mail_1.default(user.email, url, user.settings.language);
        const messages = user.lang ? translation[user.lang] : translation["עב"];
        //.assign message
        const message = messages.user.verificationMessageSent;
        res.status(201).send({ message });
    }
    catch (e) {
        res.status(400).send(e.errmsg ? e.errmsg : e);
    }
}));
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.checkValidCredentials(req.body.email, req.body.pass);
        if (user.status) {
            const token = yield user.newAuthToken();
            res.send({ user, token });
        }
        else {
            const messages = user.lang ? translation[user.lang] : translation["עב"];
            //.assign message
            const message = messages.user.notVerified;
            // send mail with link
            res.send({ message: message });
        }
    }
    catch (error) {
        res.status(400).send({ message: error.toString() });
    }
}));
router.post("/munilogin", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.checkValidCredentials(req.body.email, req.body.pass);
        console.log(user.type);
        if (user.type === "user")
            throw new Error("Please, use mobile version");
        if (user.status) {
            const token = yield user.newAuthToken();
            res.send({ user, token });
        }
        else {
            const messages = user.lang ? translation[user.lang] : translation["עב"];
            //.assign message
            const message = messages.user.notVerified;
            // send mail with link
            res.send({ message });
        }
    }
    catch (error) {
        res.status(400).send({ message: error.toString() });
    }
}));
router.get("/check", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { type, location, _id, settings } = req.user;
        res.send({
            user: { type, location, _id, settings }
        });
    }
    catch (error) {
        res.status(400).send({ message: error.toString() });
    }
}));
router.post("/logout", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        yield req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
}));
router.post("/logoutall", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        req.user.tokens = [];
        yield req.user.save();
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
}));
router.get("/:id/posts", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userPosts = yield Post.find({ createdBy: req.params.id });
        res.send(userPosts);
    }
    catch (error) {
        res.status(500).send();
    }
}));
router.patch("/settings", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("hello");
    const { _id } = req.user;
    const updates = Object.keys(req.body);
    console.log(_id);
    if (!mongodb_1.ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const user = yield User.findOne({ _id });
        if (!user) {
            res.status(404).send();
        }
        updates.forEach(update => (user.settings[update] = req.body[update]));
        console.log(user);
        yield user.save();
        res.send(user);
    }
    catch (error) {
        res.status(400).send();
    }
}));
router.patch("/:id", authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    if (!mongodb_1.ObjectID.isValid(_id)) {
        res.status(404).send();
    }
    try {
        const user = yield User.findOne({ _id });
        if (!user) {
            res.status(404).send();
        }
        updates.forEach(update => (user[update] = req.body[update]));
        yield user.save();
        res.send(user);
    }
    catch (error) {
        res.status(400).send();
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map