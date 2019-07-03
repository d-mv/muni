"use strict";
exports.__esModule = true;
var assert = require("assert");
var dotenv = require("dotenv");
var MDB = require("../modules/db_connect");
var Message = require("../modules/response_message");
var security_1 = require("../modules/security");
// import { indexedObj } from "../src/types";
// constant variables
var dotEnv = dotenv.config();
// db
var dbName = process.env.MONGO_DB || "muni";
// collections
var dbcApp = process.env.MONGO_COL_APP || "app";
var dbcMain = process.env.MONGO_COL_MAIN || "dev";
var dbAppId = process.env.MONGO_APP_ID || "5ce03ad1bb94e55d2ebf2161";
// find user by id
exports.getLocationId = function (_id, callback) {
    return MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database_1 = MDB.client.db(dbName).collection(dbcMain);
            database_1
                .findOne({ "admins._id": new MDB.ObjectId(_id) })
                .then(function (admins) {
                if (admins) {
                    exports.findMuniUserByID(_id, function (response) {
                        if (response.status) {
                            callback(Message.positive({
                                subj: "Muni user found",
                                payload: {
                                    _id: _id,
                                    location: admins._id,
                                    name: admins.name,
                                    type: "muni",
                                    pinned: admins.pinned,
                                    language: response.payload.language
                                }
                            }));
                        }
                        else {
                            callback(response);
                        }
                    });
                }
                else {
                    database_1
                        .findOne({ "users._id": new MDB.ObjectId(_id) })
                        .then(function (users) {
                        if (users) {
                            exports.findUserByID(_id, function (response) {
                                if (response.status) {
                                    callback(Message.positive({
                                        subj: "User found",
                                        payload: {
                                            _id: _id,
                                            location: users._id,
                                            name: users.name,
                                            type: "user",
                                            pinned: users.pinned,
                                            language: response.payload.language
                                        }
                                    }));
                                }
                                else {
                                    callback(response);
                                }
                            });
                        }
                        else {
                            callback(Message.notFound("user"));
                        }
                    })["catch"](function (e) {
                        return callback(Message.errorMessage({ action: "find users by ID", e: e }));
                    });
                }
            })["catch"](function (e) {
                return callback(Message.errorMessage({ action: "find admins by ID", e: e }));
            });
        }
    });
};
exports.loginUser = function (request, callback) {
    // try as user
    findUserByEmail(request.email, function (res) {
        console.log('findUserByEmail');
        console.log(res);
        // console.log(res);
        // payload:
        //  _id: 5d14cd9d6d3a9dc80c10af2e,
        // fName: 'Dwight',
        // lName: 'Homenick',
        // email: 'Abraham.Wolf@hotmail.com',
        // language: 'en',
        // pass: '$2a$10$/qj9kRpekM3wY.mcfjRHtu9RMb4rHEQtuasszibP4EQYAV6gVQcyG',
        // type: 'user',
        // location: 5ce589a00a61b5a9ca9d9caf
        if (res.status) {
            security_1.compareToHash(request.password, res.payload.pass, function (compareResult) {
                console.log("compareResult");
                console.log(compareResult);
                if (compareResult.status) {
                    var _a = res.payload, _id = _a._id, location_1 = _a.location, type = _a.type, language = _a.language, name_1 = _a.name, pinned = _a.pinned;
                    console.log(_id);
                    console.log(location_1);
                    console.log(type);
                    console.log(language);
                    console.log(name_1);
                    callback(Message.positive({
                        subj: "User authed",
                        payload: { _id: _id, location: location_1, type: "user", language: language, name: name_1, pinned: pinned }
                    }));
                }
                else {
                    callback(compareResult);
                }
            });
        }
        else {
            findMuniByEmail(request.email, function (muniResult) {
                // payload:
                //      _id: 5d14cd9e6d3a9dc80c10af4b,
                // fName: 'Trevion',
                // lName: 'Gislason',
                // email: 'user@muni.com',
                // language: 'עב',
                // pass: '$2a$10$/qj9kRpekM3wY.mcfjRHtu9RMb4rHEQtuasszibP4EQYAV6gVQcyG',
                // type: 'muni',
                // posts: [],
                // location: 5ce589a00a61b5a9ca9d9caf
                console.log(muniResult);
                if (muniResult.status) {
                    security_1.compareToHash(request.password, muniResult.payload.pass, function (compareResult) {
                        if (compareResult.status) {
                            var _a = muniResult.payload, _id = _a._id, location_2 = _a.location, type = _a.type, language = _a.language, name_2 = _a.name, pinned = _a.pinned;
                            callback(Message.positive({
                                subj: "Admin authed",
                                payload: { _id: _id, location: location_2, type: type, language: language, name: name_2, pinned: pinned }
                            }));
                        }
                        else {
                            callback(compareResult);
                        }
                    });
                }
                else {
                    callback(muniResult);
                }
            });
        }
    });
};
var findUserByEmail = function (email, callback) {
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
                        "users.email": email
                    }
                },
                {
                    $addFields: {
                        "users.location": "$_id",
                        "users.name": "$name",
                        "users.pinned": "$pinned"
                    }
                },
                {
                    $project: {
                        name: 0,
                        "users.posts": 0
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
                    $match: {
                        email: email
                    }
                }
            ])
                .toArray(function (err, result) {
                console.log('search result');
                console.log(result);
                if (err)
                    callback(Message.errorMessage({ action: "findUserByEmail", e: err }));
                if (result.length > 1) {
                    // if too many results
                    callback(Message.tooManyResultsMessage("findUserByEmail"));
                }
                else if (result.length === 1) {
                    callback(Message.positive({ subj: "User found", payload: result[0] }));
                }
                else {
                    callback(Message.notFound("user"));
                }
            });
        }
    });
};
var findMuniByEmail = function (email, callback) {
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
                        "admins.email": email
                    }
                },
                {
                    $addFields: {
                        "admins.location": "$_id",
                        "admins.name": "$name",
                        "admins.pinned": "$pinned"
                    }
                },
                {
                    $project: {
                        name: 0
                    }
                },
                {
                    $unwind: {
                        path: "$admins",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$admins"
                    }
                },
                {
                    $match: {
                        email: email
                    }
                }
            ])
                .toArray(function (err, result) {
                if (err)
                    callback(Message.errorMessage({ action: "findMuniByEmail", e: err }));
                if (result.length > 1) {
                    // if too many results
                    callback(Message.tooManyResultsMessage("findMuniByEmail"));
                }
                else if (result.length === 1) {
                    callback(Message.positive({ subj: "Muni found", payload: result[0] }));
                }
                else {
                    callback(Message.notFound("user"));
                }
            });
        }
    });
};
exports.getCategories = function (callback) {
    var database = MDB.client.db(dbName).collection(dbcApp);
    database
        .aggregate([
        {
            $project: {
                _id: 0,
                categories: 1
            }
        }
    ])
        .toArray(function (err, result) {
        if (err) {
            // if error
            callback(Message.errorMessage({
                action: "get categories",
                e: err
            }));
        }
        else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("categories not found"));
        }
        else if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("get categories"));
        }
        else {
            callback(Message.positive({
                subj: "Categories found",
                payload: result[0].categories
            }));
        }
    });
};
exports.findUserByID = function (_id, callback) {
    var database = MDB.client.db(dbName).collection(dbcMain);
    database
        .aggregate([
        {
            $match: {
                "users._id": new MDB.ObjectId(_id)
            }
        },
        {
            $project: {
                _id: 0,
                users: 1
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
            $match: {
                _id: new MDB.ObjectId(_id)
            }
        }
    ])
        .toArray(function (err, result) {
        if (err) {
            // if error
            callback(Message.errorMessage({
                action: "get userById",
                e: err
            }));
        }
        else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("users by Id"));
        }
        else if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("get usersById"));
        }
        else {
            callback(Message.positive({
                subj: "User found",
                payload: result[0]
            }));
        }
    });
};
exports.findMuniUserByID = function (_id, callback) {
    var database = MDB.client.db(dbName).collection(dbcMain);
    database
        .aggregate([
        {
            $match: {
                "admins._id": new MDB.ObjectId(_id)
            }
        },
        {
            $project: {
                _id: 0,
                admins: 1
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
            $match: {
                _id: new MDB.ObjectId(_id)
            }
        }
    ])
        .toArray(function (err, result) {
        if (err) {
            // if error
            callback(Message.errorMessage({
                action: "get muniUserById",
                e: err
            }));
        }
        else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("muniUsers by Id"));
        }
        else if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("get muniUsersById"));
        }
        else {
            callback(Message.positive({
                subj: "Muni user found",
                payload: result[0]
            }));
        }
    });
};
