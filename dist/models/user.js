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
// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const dotEnv = dotenv.config();
const secret = process.env.SECRET;
const Post = require("./post");
var UserKind;
(function (UserKind) {
    UserKind[UserKind["user"] = 0] = "user";
    UserKind[UserKind["muni"] = 1] = "muni";
})(UserKind = exports.UserKind || (exports.UserKind = {}));
const UserSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "Location"
    },
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    pass: {
        type: String,
        trim: true,
        minlength: 7,
        required: true
    },
    type: { type: UserKind, trim: true, required: true, default: "user" },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    settings: {
        language: { type: String, required: true, default: "עב" },
        help: { type: Boolean, required: true, default: true }
    },
    status: { type: Boolean, required: true, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
UserSchema.statics.checkValidCredentials = (email, pass) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = yield bcrypt.compare(pass, user.pass);
    if (!isMatch) {
        throw new Error("Wrong password");
    }
    if (!user.status) {
        throw new Error("Not active");
    }
    return user;
});
UserSchema.methods.newAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jwt.sign({ _id: user.id.toString() }, secret);
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.pass;
    delete userObj.tokens;
    return userObj;
};
//hash the plain text password before saving
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("pass")) {
            user.pass = yield bcrypt.hash(user.pass, 8);
        }
        next();
    });
});
UserSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        yield Post.deleteMany({ createdBy: user._id });
        next();
    });
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
//# sourceMappingURL=user.js.map