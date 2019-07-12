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
const data = require("../../data/data.json");
const express = require("express");
const router = new express.Router();
const authenticate = require("../../middleware/direct");
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const translation = data;
    try {
        const result = yield authenticate(req.query.id);
        // choose language
        const messages = result.lang ? translation[result.lang] : translation["עב"];
        //.assign message
        const message = messages.user[result.message];
        res.status(201).render(result.message, { message });
    }
    catch (error) {
        res.status(400).render("malformed", { message: error });
    }
}));
exports.default = router;
//# sourceMappingURL=verify.js.map