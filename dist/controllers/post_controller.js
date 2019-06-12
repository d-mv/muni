"use strict";
exports.__esModule = true;
var Post = require("../models/post_model");
// import { checkToken } from "../modules/check_token";
var security_1 = require("../modules/security");
var Message = require("../modules/response_message");
var response_message_1 = require("../modules/response_message");
/**
 * Function to create post. _Example of the body_:
 *
 *```
 * { "post":
 *          {
 *            "title": "Post title",
 *            "text": "Lorem ipsum dolor sit amet...",
 *            "photo": "http://...",
 *            "link": "http://...",
 *            "type": "post",
 *            "newsId": "5ce2a3c945e5451171394b35", // - this can be 000 for empty
 *            "status": true,
 *            "votes": {
 *                        "up": 0,
 *                        "down": 0
 *             }
 *           },
 *   "location": "5ce2a3c945e5451171394b35"
 * }
 * ```
 *
 * @function createPost
 * @param {object} props - Incoming feed from router
 * @returns {callback} - Callback function to return response
 *
 */
exports.createPost = function (query, callback) {
    security_1.checkToken(query.token, function (checkTokenResponse) {
        var _id = checkTokenResponse.payload.payload._id;
        var location = checkTokenResponse.payload.payload.location;
        var check = query.user === _id && query.location === location.toString();
        // console.log(checkTokenResponse);
        // console.log(query.user === _id);
        // console.log(typeof query.location);
        // console.log(typeof location);
        // console.log(query.location === location.toString());
        // console.log(checkTokenResponse);
        if (check) {
            var request = {
                user: query.user,
                location: query.location,
                post: query.post
            };
            Post.create(request, function (modelResponse) {
                callback(modelResponse);
            });
        }
        else {
            callback(Message.notAuthMessage("token is not verified"));
        }
    });
};
/**
 * Function to update post
 * @function updatePost
 * @param {object} props - Incoming feed from router
 * @return {callback} - Callback function to return response
 */
exports.updatePost = function (props, callback) {
    if (Object.keys(props.body).length === 0) {
        // if request body is empty
        callback(response_message_1.requestError("Wrong/malformed request"));
    }
    else {
        if (!props.headers.token) {
            // if token is not present send code/message
            callback(response_message_1.requestError("Token is missing"));
        }
        else {
            // token is present, check it
            security_1.checkToken(props.headers.token, function (checkTokenResponse) {
                // check if code is not positive
                if (checkTokenResponse.code !== 200) {
                    // negative code
                    callback(checkTokenResponse);
                }
                else {
                    // positive code = 200
                    Post.update({
                        fields: props.body.post,
                        postId: props.params.id,
                        user: checkTokenResponse
                    }, function (modelResponse) {
                        // callback with response
                        callback(modelResponse);
                    });
                }
            });
        }
    }
};
/**
 * Function to delete post
 * @function deletePost
 * @param {object} props - Incoming feed from router
 * @return {callback} - Callback function to return response
 */
exports.deletePost = function (props, callback) {
    if (!props.headers.token) {
        // if token is not present send code/message
        callback(response_message_1.requestError("Token is missing"));
    }
    else {
        // token is present, check it
        security_1.checkToken(props.headers.token, function (checkTokenResponse) {
            // check if code is not positive
            if (checkTokenResponse.code !== 200) {
                // negative code
                callback(checkTokenResponse);
            }
            else {
                // positive code = 200
                Post.deletePost({
                    postId: props.params.id,
                    user: checkTokenResponse
                }, function (modelResponse) {
                    // callback with response
                    callback(modelResponse);
                });
            }
        });
    }
};
/** Get the list of locations
 * @function posts
 * @param  {object} props - Request in the form of IncPostsListTYPE
 * @return {callback} - Callback function to return response
 */
exports.posts = function (props, callback) {
    Post.list(props, function (modelResponse) {
        console.log("object");
        callback(modelResponse);
    });
};
