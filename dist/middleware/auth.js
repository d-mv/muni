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
const auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const token = req
            .header("Authorization")
            .replace("Bearer", "")
            .trim();
        const decoded = jwt.verify(token, secret);
        const user = yield User.findOne({
            _id: decoded._id,
            "tokens.token": token
        });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate!" });
    }
});
// const authDirect = async (token: string) => {
//   console.log(token)
//   try {
//     const decoded: any = jwt.verify(token, secret);
//     console.log(decoded)
//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": token
//     });
//     if (!user) {
//       throw new Error();
//     }
//     return { status: true, _id: decoded._id };
//   } catch (error) {
//     return { status: false };
//   }
// };
module.exports = auth;
//# sourceMappingURL=auth.js.map