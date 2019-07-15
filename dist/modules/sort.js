"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortPosts = (posts) => posts.sort((a, b) => a.votes.length < b.votes.length ? 1 : -1);
//# sourceMappingURL=sort.js.map