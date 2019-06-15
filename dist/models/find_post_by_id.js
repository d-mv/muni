"use strict";
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
 * Function to find posts by ID, to verify existing posts
 * @function findPostById
 * @param {string} id - Post ID
 * @callback callback - Callback function to return response
 */
var findPostById = function (id, callback) {
    // check if post title is available
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (4)", e: err }));
        }
        else {
            // set database
            // console.log("id")
            // console.log(id)
            var database = MDB.client.db(dbName).collection(dbcMain);
            // check the names availability
            database
                .aggregate([
                {
                    $match: {
                        "users.posts._id": new MDB.ObjectId(id)
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
                    $replaceRoot: {
                        newRoot: "$posts"
                    }
                },
                {
                    $match: {
                        _id: new MDB.ObjectId(id)
                    }
                }
            ])
                .toArray(function (e, documents) {
                if (e) {
                    callback(Message.errorMessage({ action: "post search by ID", e: e }));
                }
                else if (documents.length > 1) {
                    // houston, we've got problem
                    callback(Message.tooManyResultsMessage("post search by ID "));
                }
                else if (documents.length === 1) {
                    // already exists
                    callback(Message.foundMessage("Post", { payload: documents[0] }));
                }
                else {
                    // no result
                    callback(Message.notFound("post"));
                }
            });
        }
    });
};
exports["default"] = findPostById;
