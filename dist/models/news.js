"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const NewsSchema = new mongoose.Schema({
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
    text: { type: String, required: true, trim: true, minLength: 20 },
    photo: { type: String, trim: true },
    link: { type: String, required: true, trim: true, minLength: 20 },
    active: { type: Boolean, required: true, default: true },
    pinned: { type: Boolean, required: true, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const News = mongoose.model("News", NewsSchema);
module.exports = News;
//# sourceMappingURL=news.js.map