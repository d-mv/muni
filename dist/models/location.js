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
// const mongoose = ;
const mongoose = require("mongoose");
const User = require("./user");
const News = require("./news");
const LocationSchema = new mongoose.Schema({
    name: {
        עב: { type: String, required: true, trim: true, minLength: 3 },
        ع: { type: String, required: true, trim: true, minLength: 3 },
        en: { type: String, required: true, trim: true, minLength: 3 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
LocationSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const location = this;
        yield User.deleteMany({ location: location._id });
        yield News.deleteMany({ location: location._id });
        next();
    });
});
LocationSchema.virtual("users", {
    ref: "User",
    localField: "_id",
    foreignField: "location"
});
LocationSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "location"
});
LocationSchema.virtual("news", {
    ref: "News",
    localField: "_id",
    foreignField: "location"
});
const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
//# sourceMappingURL=location.js.map