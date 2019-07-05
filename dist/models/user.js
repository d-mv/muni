"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv = require("dotenv");
var dotEnv = dotenv.config();
var secret = process.env.SECRET;
var Post = require("./post");
var UserKind;
(function (UserKind) {
    UserKind[UserKind["user"] = 0] = "user";
    UserKind[UserKind["muni"] = 1] = "muni";
})(UserKind = exports.UserKind || (exports.UserKind = {}));
var UserSchema = new mongoose_1["default"].Schema({
    location: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
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
    type: { type: UserKind, trim: true, required: true, "default": "user" },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    settings: {
        language: { type: String, required: true, "default": "עב" },
        help: { type: Boolean, required: true, "default": true }
    },
    status: { type: Boolean, required: true, "default": false },
    createdAt: {
        type: Date,
        "default": Date.now
    }
});
UserSchema.statics.checkValidCredentials = function (email, pass) { return __awaiter(_this, void 0, void 0, function () {
    var user, isMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error("User not found");
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(pass, user.pass)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    throw new Error("Wrong password");
                }
                if (!user.status) {
                    throw new Error("Not active");
                }
                return [2 /*return*/, user];
        }
    });
}); };
UserSchema.methods.newAuthToken = function () {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = this;
                    token = jsonwebtoken_1["default"].sign({ _id: user.id.toString() }, secret);
                    user.tokens = user.tokens.concat({ token: token });
                    return [4 /*yield*/, user.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
};
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();
    delete userObj.pass;
    delete userObj.tokens;
    return userObj;
};
//hash the plain text password before saving
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = this;
                    if (!user.isModified("pass")) return [3 /*break*/, 2];
                    _a = user;
                    return [4 /*yield*/, bcryptjs_1["default"].hash(user.pass, 8)];
                case 1:
                    _a.pass = _b.sent();
                    _b.label = 2;
                case 2:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
UserSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = this;
                    return [4 /*yield*/, Post.deleteMany({ createdBy: user._id })];
                case 1:
                    _a.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
var User = mongoose_1["default"].model("User", UserSchema);
module.exports = User;
