"use strict";
exports.__esModule = true;
/**
 * Votes fields
 * @typedef {Object} votesTYPE
 * @property {number} up
 * @property {number} down
 */
/**
 * Post fields
 * @typedef {Object} newPostTYPE
 * @property {string} title
 * @property {string} text
 * @property {string} photo
 * @property {string} link
 * @property {string} type
 * @property {string} newsId
 * @property {string} createdBy
 * @property {boolean} status
 * @property {votesTYPE} votes
 */
/**
 * Function to check new post fields, to ensure all are available and not empty
 * @function checkPostFields
 * @param {newPostTYPE} post
 * @return {boolean} - Returns if true or not
 */
var checkPostFields = function (post) {
    // the qty of top-level keys should be 8
    if (Object.keys(post).length !== 8) {
        return false;
    }
    else {
        // default set of keys for the post
        var defaultSetOfKeys = [
            "title",
            "text",
            "photo",
            "link",
            "type",
            "newsId",
            "status",
            "votes"
        ];
        // score must be 9
        var score_1 = 0;
        // go through the array with keys and check each element
        defaultSetOfKeys.forEach(function (key) {
            // @ts-ignore
            var value = post[key];
            // 'votes' has 2nd-level keys
            if (key === "votes") {
                Object.keys(value).forEach(function (voteKey) {
                    if (typeof value[voteKey] === "number")
                        score_1 += 1;
                });
            }
            else if (key === "status") {
                if (typeof value === "boolean")
                    score_1 += 1;
            }
            else {
                if (value) {
                    if (typeof value === "string" && value.length > 0)
                        score_1 += 1;
                }
            }
        });
        return score_1 === 9;
    }
};
exports["default"] = checkPostFields;
