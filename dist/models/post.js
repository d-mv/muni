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
const PostSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "Location"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true
    },
    problem: { type: String, required: true, trim: true, minLength: 10 },
    solution: { type: String, trim: true, minLength: 10 },
    photo: { type: String, trim: true },
    link: { type: String, trim: true, minLength: 5 },
    newsId: { type: mongoose.Schema.Types.ObjectId },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    active: { type: Boolean, required: true, default: true },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    votesCount: {
        type: Number
    },
    reply: {
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
        up: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ],
        down: [{ type: mongoose.Schema.Types.ObjectId }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
PostSchema.virtual("users", {
    ref: "User",
    localField: "createdBy",
    foreignField: "_id"
});
//hash the plain text password before saving
PostSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = this;
        post.votesCount = post.votes.length;
        next();
    });
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
//# sourceMappingURL=post.js.map