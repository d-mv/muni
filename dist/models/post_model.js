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
var find_post_by_id_1 = require("./find_post_by_id");
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
                    $unwind: {
                        path: "$users",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$users"
                    }
                },
                {
                    $unwind: {
                        path: "$posts",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        posts: 1
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$posts"
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
 *
 * @param {object} request - New post fields and user ID
 * @callback callback - Callback function to return response
 *
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
/**
 * Function to update post
 * @function update
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
exports.update = function (request, callback) {
    // check if post title is available
    // findPostById(request.postId, (findPostResult: TYPE.apiResponse) => {
    // if status true inform, that user exists
    // if status false, proceed with creation
    // if (findPostResult.code !== 200) {
    // send message
    // callback(findPostResult);
    // } else if (
    // checking authorization
    //   request.user.level === "su" ||
    //   findPostResult.payload.createdBy == request.user.payload.id
    // ) {
    // authenticated
    console.log(request);
    var setRequest = {};
    // prepare the request
    Object.keys(request.fields).forEach(function (key) {
        setRequest["users.$[].posts.$[reply]." + key] = request.fields[key];
    });
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
            console.log(setRequest);
            database
                .updateMany({ "users.posts._id": new MDB.ObjectId(request.postId) }, { $set: __assign({}, setRequest) }, {
                arrayFilters: [{ "reply._id": new MDB.ObjectId(request.postId) }]
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
    // } else {
    //   callback(
    //     Message.notAuthMessage(
    //       "You need to be either owner or administrator to edit this post"
    //     )
    //   );
    // }
};
// );
// };
/**
 * Function to delete post
 * @function deletePost
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
exports.deletePost = function (request, callback) {
    // check if post title is available
    find_post_by_id_1["default"](request.postId, function (findPostResult) {
        // if status true inform, that user exists
        // if status false, proceed with creation
        if (findPostResult.code !== 200) {
            // send message
            callback(findPostResult);
        }
        else if (
        // checking authorization
        request.user.level === "su" ||
            findPostResult.payload.createdBy == request.user.payload.id) {
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
        }
        else {
            callback(Message.notAuthMessage("You need to be either owner or administrator to edit this post"));
        }
    });
};
exports.vote = function (request, callback) {
    var id = request.id, user = request.user;
    console.log("id");
    console.log("user");
    console.log(id);
    console.log(user);
    find_post_by_id_1["default"](id, function (findPostResult) {
        if (findPostResult.status) {
            var voters = findPostResult.payload.votes;
            var inlcudes = voters.includes(user);
            if (inlcudes) {
                // already voted
                callback(Message.generalError({ subj: "Already voted", code: 401 }));
            }
            else {
                // not yet voted
                MDB.client.connect(function (err) {
                    assert.equal(null, err);
                    if (err) {
                        // return error with connection
                        callback(Message.errorMessage({
                            action: "connection to DB (5)",
                            e: err
                        }));
                    }
                    else {
                        var database = MDB.client.db(dbName).collection(dbcMain);
                        // const index = `users.$[].posts.$[reply].${id}`;
                        // setRequest[`users.$[].posts.$[reply].${key}`] = request.fields[key];
                        var dBrequest = {};
                        // dBrequest[index] = user;
                        dBrequest["users.$[].posts.$[reply].votes.$[]"] = user;
                        // update
                        database
                            .updateMany({ "users.posts._id": new MDB.ObjectId(id) }, { $push: { "users.$.posts.$[reply].votes": user } }, 
                        // { $set: { ...dBrequest } },
                        {
                            arrayFilters: [{ "reply._id": new MDB.ObjectId(id) }]
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
            }
        }
        else {
            callback(findPostResult);
        }
    });
};
