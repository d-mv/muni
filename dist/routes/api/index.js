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
const db_seed_1 = require("../../db/db_seed");
const express = require("express");
const router = new express.Router();
router.get("/seed", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const seed = yield db_seed_1.default();
        res.status(201).send({ message: seed });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete("/image", (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.body);
    // try {
    //   const seed = await dbSeed();
    //   res.status(201).send({ message: seed });
    // } catch (e) {
    //   res.status(400).send(e);
    // }
}));
exports.default = router;
//# sourceMappingURL=index.js.map