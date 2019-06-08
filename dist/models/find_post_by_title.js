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
 * Function to find posts by title, to verify existing posts
 * @function findPostByTitle
 * @param {string} location - Location ID - posts at different locations might have the same title
 * @param {string} title - Title of the post to search
 * @callback callback - Callback function to return response
 */
var findPostByTitle = function (location, title, callback) {
    // check if post title is available
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (3)", e: err }));
        }
        else {
            // set database
            var database = MDB.client.db(dbName).collection(dbcMain);
            // check the names availability
            database
                .aggregate([
                {
                    $match: {
                        _id: new MDB.ObjectId(location)
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
                        title: title
                    }
                }
            ])
                .toArray(function (e, documents) {
                console.log(documents);
                if (e) {
                    callback(Message.errorMessage({ action: "post search by title", e: e }));
                }
                else if (documents.length > 0) {
                    // houston, we've got problem
                    callback(Message.tooManyResultsMessage("post search by title"));
                }
                else if (documents.length === 1) {
                    // already exists
                    callback(Message.foundMessage("Post"));
                }
                else {
                    // no result
                    callback(Message.notFound("post"));
                }
            });
        }
    });
};
exports["default"] = findPostByTitle;
