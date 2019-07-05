"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1["default"].Schema({
    location: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
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
    problem: { type: String, required: true, trim: true, minLength: 20 },
    solution: { type: String, required: true, trim: true, minLength: 20 },
    photo: { type: String, trim: true },
    link: { type: String, trim: true, minLength: 20 },
    newsId: { type: mongoose_1["default"].Schema.Types.ObjectId },
    createdBy: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    active: { type: Boolean, required: true, "default": true },
    votes: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId
        }
    ],
    reply: {
        text: { type: String },
        createdAt: { type: Date, "default": Date.now },
        up: [
            {
                type: mongoose_1["default"].Schema.Types.ObjectId
            }
        ],
        down: [
            {
                type: mongoose_1["default"].Schema.Types.ObjectId
            }
        ]
    },
    createdAt: {
        type: Date,
        "default": Date.now
    }
});
PostSchema.virtual("users", {
    ref: "User",
    localField: "createdBy",
    foreignField: "_id"
});
var Post = mongoose_1["default"].model("Post", PostSchema);
module.exports = Post;
