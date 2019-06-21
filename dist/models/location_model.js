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
 * Function to list all locations (without users/posts). Need for login.
 * @function list
 * @callback callback - Callback function to return the response
 */
exports.list = function (callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        var database = MDB.client.db(dbName).collection(dbcMain);
        database
            .aggregate([
            {
                $project: {
                    name: 1,
                    photo: 1
                }
            }
        ])
            .toArray(function (e, result) {
            if (e) {
                callback(Message.errorMessage({ action: "locations fetch", e: e }));
            }
            else if (result.length > 0) {
                callback(Message.positiveMessage({
                    subj: "Locations found",
                    code: 200,
                    payload: result
                }));
            }
            else {
                callback(Message.notFound("locations"));
            }
            MDB.client.close();
        });
    });
};
/**
 * Function to create a location
 * @function create
 * @param {object} query - A set of fields for the new location
 * @callback callback - Callback function to return the response
 */
exports.create = function (query, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        var database = MDB.client.db(dbName).collection(dbcMain);
        // check the names availability
        var search = { name: query.name };
        database.find(search).toArray(function (e, documents) {
            console.log(documents);
            if (e) {
                callback(Message.errorMessage({ action: "location (similar) search", e: e }));
            }
            else if (documents.length > 1) {
                // houston, we've got problem
                callback(Message.tooManyResultsMessage("location (similar) search"));
            }
            else if (documents.length === 1) {
                // already exists
                callback(Message.alreadyExistsMessage("Location"));
            }
            else {
                // no result
                // set the object for creation
                var createLocation = __assign({ _id: new MDB.ObjectId() }, query);
                database
                    .insertOne(__assign({}, createLocation))
                    .then(function (dbReply) {
                    if (dbReply.insertedCount === 1) {
                        callback(Message.positiveMessage({
                            subj: "Location created",
                            payload: { payload: { id: dbReply.insertedId } }
                        }));
                    }
                    else {
                        callback(Message.generalError({
                            subj: "Location was not created",
                            code: 500
                        }));
                    }
                })["catch"](function (e) {
                    assert.equal(null, e);
                    callback(Message.errorMessage({ action: "location creation", e: e }));
                });
            }
        });
        //
    });
};
/**
 * Function to update a location
 * @function update
 * @param {string} location - A set of fields for the updated location
 * @param {object} fields - A set of fields for the updated location
 * @callback callback - Callback function to return the response
 */
exports.update = function (location, fields, callback) {
    // check is location available
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        assert.equal(null, err);
        var database = MDB.client.db("muni").collection(dbcMain);
        database
            .find({ _id: new MDB.ObjectId(location) })
            .toArray(function (e, documents) {
            console.log(documents);
            if (e) {
                callback(Message.errorMessage({ action: "location (by ID) search", e: e }));
            }
            else if (documents.length > 1) {
                // houston, we've got problem
                callback(Message.tooManyResultsMessage("location (by ID) search"));
            }
            else if (documents.length === 0) {
                // does not exist
                callback(Message.notFound("Location"));
            }
            else {
                database
                    .updateOne({ _id: new MDB.ObjectId(location) }, { $set: fields })
                    .then(function (document) {
                    // process response
                    callback(Message.updateMessage({
                        subj: "Location",
                        document: {
                            ok: document.result.ok,
                            nModified: document.result.nModified
                        }
                    }));
                })["catch"](function (e) {
                    assert.equal(null, e);
                    callback(Message.errorMessage({ action: "location update", e: e }));
                });
            }
        });
    });
};
/**
 * Function to delete location
 * @function deleteLocation
 * @param {string} location - ID of location
 * @callback callback - Callback function to return the response
 */
exports.deleteLocation = function (location, callback) {
    // check is location available
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database_1 = MDB.client.db("muni").collection(dbcMain);
            database_1
                .find({ _id: new MDB.ObjectId(location) })
                .toArray(function (e, documents) {
                if (e) {
                    callback(Message.errorMessage({ action: "location (by ID) search", e: e }));
                }
                else if (documents.length > 1) {
                    // houston, we've got problem
                    callback(Message.tooManyResultsMessage("location (by ID) search"));
                }
                else if (documents.length === 0) {
                    // does not exist
                    callback(Message.notFound("Location"));
                }
                else {
                    database_1
                        .deleteOne({ _id: new MDB.ObjectId(location) })
                        .then(function (document) {
                        console.log(document);
                        // process response
                        callback(Message.updateMessage({
                            subj: "Location",
                            document: {
                                ok: document.result.ok,
                                nModified: document.result.nModified
                            }
                        }));
                    })["catch"](function (e) {
                        assert.equal(null, e);
                        callback(Message.errorMessage({ action: "location delete", e: e }));
                    });
                }
            });
        }
    });
};
