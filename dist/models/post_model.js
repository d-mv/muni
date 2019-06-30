"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var assert = require("assert");
var dotenv = require("dotenv");
var MDB = require("../modules/db_connect");
var Message = require("../modules/response_message");
// constant variables
var dotEnv = dotenv.config();
// db
var dbName = process.env.MONGO_DB || "muni";
// collections
var dbcMain = process.env.MONGO_COL_MAIN || "dev";
/**
 * Function to return list of posts
 * @function list
 * @param {object} query - Contains location
 * @callback callback - Callback function to return response
 */
exports.list = function (query, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcMain);
            database
                .aggregate([
                {
                    $match: {
                        _id: new MDB.ObjectId(query.location)
                    }
                },
                {
                    $project: {
                        posts: "$users.posts"
                    }
                },
                {
                    $project: {
                        allPosts: {
                            $reduce: {
                                input: "$posts",
                                initialValue: [],
                                "in": {
                                    $concatArrays: ["$$value", "$$this"]
                                }
                            }
                        }
                    }
                }
            ])
                .toArray(function (e, result) {
                if (e) {
                    // if error
                    callback(Message.errorMessage({ action: "posts (by location) search", e: e }));
                }
                else if (result.length === 0) {
                    // not found
                    callback(Message.notFound("posts"));
                }
                else {
                    // bingo
                    // return result
                    callback(Message.positiveMessage({
                        subj: "Found " + result.length + " post(s)",
                        payload: result[0].allPosts
                    }));
                }
            });
        }
    });
};
exports.listMuni = function (query, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcMain);
            database
                .aggregate([
                {
                    $match: {
                        _id: new MDB.ObjectId(query.location)
                    }
                },
                {
                    $unwind: {
                        path: "$municipality",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$municipality"
                    }
                }
            ])
                .toArray(function (e, result) {
                if (e) {
                    // if error
                    callback(Message.errorMessage({
                        action: "municipality posts (by location) search",
                        e: e
                    }));
                }
                else if (result.length === 0) {
                    // not found
                    callback(Message.notFound("municipality posts"));
                }
                else {
                    // bingo
                    // return result
                    callback(Message.positiveMessage({
                        subj: "Found " + result.length + " municipality post(s)",
                        payload: result
                    }));
                }
            });
        }
    });
};
exports.checkByTitle = function (location, title, callback) {
    var database = MDB.client.db(dbName).collection(dbcMain);
    database
        .aggregate([
        {
            $match: {
                _id: new MDB.ObjectId(location),
                "users.posts.title": title
            }
        }
    ])
        .toArray(function (e, res) {
        if (e || res.length === 0) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
};
/**
 * Function to create post
 * @param {object} request - New post fields and user ID
 * @callback callback - Callback function to return response
 */
exports.create = function (request, callback) {
    exports.checkByTitle(request.location, request.post.title, function (checkResponse) {
        if (checkResponse) {
            callback(Message.alreadyExistsMessage("post title"));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcMain);
            // set document to insert
            var newDocument = __assign({ _id: new MDB.ObjectId(), createdBy: new MDB.ObjectId(request.user), date: new Date(), status: "active", votes: [], reply: {
                    text: "",
                    date: new Date(),
                    up: [],
                    down: []
                } }, request.post);
            database
                .update({
                _id: new MDB.ObjectId(request.location),
                "users._id": new MDB.ObjectId(request.user)
            }, { $push: { "users.$.posts": newDocument } })
                .then(function (document) {
                // process response
                callback(Message.updateMessage({
                    subj: "Post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post create", e: e }));
            });
        }
    });
};
exports.createMuni = function (request, callback) {
    var newPost = __assign({}, request.post, { _id: new MDB.ObjectId(), date: new Date(), status: "active" });
    var database = MDB.client.db(dbName).collection(dbcMain);
    database
        .update({
        _id: new MDB.ObjectId(request.location)
    }, { $push: { municipality: newPost } })
        .then(function (document) {
        // process response
        if (request.post.pinned) {
            database
                .update({
                _id: new MDB.ObjectId(request.location)
            }, { pinned: newPost })
                .then(function (pinned) {
                callback(Message.updateMessage({
                    subj: "Pinned post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "pinned post create", e: e }));
            });
        }
        else {
            callback(Message.updateMessage({
                subj: "Post",
                document: {
                    ok: document.result.ok,
                    nModified: document.result.nModified
                }
            }));
        }
    })["catch"](function (e) {
        assert.equal(null, e);
        callback(Message.errorMessage({ action: "pinned post create", e: e }));
    });
};
/**
 * Function to update post
 * @function update
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
exports.update = function (request, callback) {
    console.log("update");
    // console.log(request.reply.text);
    // extract id from post object
    var id = request._id;
    var post = request;
    delete post._id;
    // console.log(Object.keys(request))
    // console.log(post.title)
    var setRequest = {};
    // prepare the request
    Object.keys(post).forEach(function (key) {
        setRequest["users.$[].posts.$[reply]." + key] = post[key];
    });
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (7)", e: err }));
        }
        else {
            // set database
            var database = MDB.client.db(dbName).collection(dbcMain);
            // update
            // console.log(setRequest);
            database
                .updateMany({ "users.posts._id": new MDB.ObjectId(id) }, { $set: __assign({}, setRequest) }, {
                arrayFilters: [{ "reply._id": new MDB.ObjectId(id) }]
            })
                .then(function (document) {
                // console.log(document)
                // process response
                callback(Message.updateMessage({
                    subj: "Post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post update", e: e }));
            });
        }
    });
};
/**
 * Function to delete post
 * @function deletePost
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
exports.deletePost = function (request, callback) {
    // check if post title is available
    // findPostById(request.postId, (findPostResult: TYPE.apiResponse) => {
    //   // if status true inform, that user exists
    //   // if status false, proceed with creation
    //   if (findPostResult.code !== 200) {
    //     // send message
    //     callback(findPostResult);
    //   } else if (
    //     // checking authorization
    //     request.user.level === "su" ||
    //     findPostResult.payload.createdBy == request.user.payload.id
    //   ) {
    // authenticated
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (5)", e: err }));
        }
        else {
            // set database
            var database = MDB.client.db(dbName).collection(dbcMain);
            // update
            database
                .update({ "users.posts._id": new MDB.ObjectId(request.postId) }, {
                $pull: {
                    "users.$[].posts": { _id: new MDB.ObjectId(request.postId) }
                }
            })
                .then(function (document) {
                // process response
                callback(Message.updateMessage({
                    subj: "Post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post update", e: e }));
            });
        }
    });
};
//     } else {
//       callback(
//         Message.notAuthMessage(
//           "You need to be either owner or administrator to edit this post"
//         )
//       );
//     }
//   });
// };
exports.vote = function (request, callback) {
    var id = request.id, user = request.user;
    console.log("id");
    console.log("user");
    // console.log(id);
    // console.log(user);
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({
                action: "connection to DB (6)",
                e: err
            }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcMain);
            // let dBrequest: TYPE.data = {};
            // dBrequest[`users.$[].posts.$[reply].votes.$[]`] = user;
            // update
            database
                .update({ "users.posts._id": new MDB.ObjectId(id) }, {
                $addToSet: {
                    "users.$.posts.$[reply].votes": new MDB.ObjectId(user)
                }
            }, {
                arrayFilters: [{ "reply._id": new MDB.ObjectId(id) }]
            })
                .then(function (document) {
                // process response
                // console.log(document);
                callback(Message.updateMessage({
                    subj: "Post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post update", e: e }));
            });
        }
    });
};
exports.replyVote = function (request, callback) {
    console.log("requets to update reply votes:");
    // console.log(request);
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({
                action: "connection to DB (8)",
                e: err
            }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcMain);
            // if true - vote up
            var subj = request.vote
                ? { "users.$.posts.$[reply].reply.up": new MDB.ObjectId(request.user) }
                : {
                    "users.$.posts.$[reply].reply.down": new MDB.ObjectId(request.user)
                };
            database
                .update({ "users.posts._id": new MDB.ObjectId(request.post) }, {
                $addToSet: subj
            }, {
                arrayFilters: [{ "reply._id": new MDB.ObjectId(request.post) }]
            })
                .then(function (document) {
                // process response
                // console.log(document);
                callback(Message.updateMessage({
                    subj: "Post reply vote",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post reply voteupdate", e: e }));
            });
        }
    });
};
exports.updateMuni = function (request, callback) {
    console.log("updateMuni");
    //  console.log(request);
    // console.log(Object.keys(request.post));
    // console.log(request.post.text);
    // console.log(request);
    var location = request.location, post = request.post;
    // const post: TYPE.indexedObj = request.post;
    // const id = post._id;
    // delete post._id;
    var setRequest = [];
    Object.keys(post).forEach(function (key) {
        setRequest["municipality.$[reply]." + key] = post[key];
    });
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (P1)", e: err }));
        }
        else {
            // set database
            var database = MDB.client.db(dbName).collection(dbcMain);
            database
                .updateMany({ _id: new MDB.ObjectId(location) }, { $set: { "municipality.$[reply]": post } }, {
                arrayFilters: [{ "reply._id": new MDB.ObjectId(post._id) }]
            })
                .then(function (document) {
                // process response
                // console.log(document);
                callback(Message.updateMessage({
                    subj: "Post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post update", e: e }));
            });
        }
    });
};
exports.deleteMuniPost = function (request, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (5)", e: err }));
        }
        else {
            // set database
            var database = MDB.client.db(dbName).collection(dbcMain);
            // update
            database
                .update({ _id: new MDB.ObjectId(request.location) }, {
                $pull: { municipality: { _id: new MDB.ObjectId(request.postId) } }
            })
                .then(function (document) {
                // process response
                callback(Message.updateMessage({
                    subj: "Post",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post update", e: e }));
            });
        }
    });
};
