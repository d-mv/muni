"use strict";
exports.__esModule = true;
var assert_1 = require("assert");
var MDB = require("../modules/db_connect");
var dbName = "muni";
exports.list = function (callback) {
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .aggregate([
            {
                $project: {
                    name: "$lang.en"
                }
            }
        ])
            .toArray(function (err, result) {
            var response = {
                status: false,
                message: "No locations in the DB",
                code: 203
            };
            if (err) {
                response.message = "Error: " + err;
                response.code = 500;
            }
            else if (result.length > 0) {
                response = {
                    status: true,
                    message: "Locations found",
                    code: 200,
                    payload: result
                };
            }
            callback(response);
        });
    });
};
