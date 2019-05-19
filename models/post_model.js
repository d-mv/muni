"use strict";
exports.__esModule = true;
var assert_1 = require("assert");
var MDB = require("../modules/db_connect");
exports.list = function (query, callback) {
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var database = MDB.client.db("muni").collection("dev");
        database
            .aggregate([
            {
                $match: {
                    _id: new MDB.ObjectID(query.location)
                }
            },
            {
                $unwind: {
                    path: "$users",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    list: "$users.posts"
                }
            }
        ])
            .toArray(function (err, result) {
            // if 0
            var response = {
                status: false,
                message: "No posts in the DB",
                code: 203
            };
            // if err
            if (err) {
                response.message = "Error: " + err;
                response.code = 500;
                // if many
            }
            else if (result.length > 0) {
                // process result
                var payload_1 = [];
                result.forEach(function (block) {
                    block.list.forEach(function (set) {
                        payload_1.push(set);
                    });
                });
                response = {
                    status: true,
                    message: "Posts found",
                    code: 200,
                    payload: payload_1
                };
            }
            callback(response);
        });
    });
};
