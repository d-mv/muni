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
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotEnv = dotenv.config();
const secret = process.env.SECRET;
const authDirect = (token) => __awaiter(this, void 0, void 0, function* () {
    try {
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            throw new Error("malformed");
        }
        const user = yield User.findOne({
            _id: decoded._id,
            "tokens.token": token
        });
        if (!user) {
            throw new Error("expired");
        }
        const update = yield User.updateOne({ _id: decoded._id }, { status: true });
        if (!update) {
            throw new Error();
        }
        return { status: true, message: 'confirmed', lang: user.settings.language };
    }
    catch (error) {
        // console.log(error)
        return { status: false, message: error.message };
    }
});
module.exports = authDirect;
//# sourceMappingURL=direct.js.map