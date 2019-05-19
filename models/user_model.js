"use strict";
exports.__esModule = true;
var assert_1 = require("assert");
var MDB = require("../modules/db_connect");
var Generate = require("../modules/token_gen");
var check_strings_1 = require("../modules/check_strings");
var dbName = "muni";
// * Utilities
/**
 * Update user fields
 * @function updateUser
 * @param {string} id - User ID, found before (double check)
 * @param { object } newFields - New fields to update
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
var updateUser = function (id, newFields, callback) {
    console.log("upd:");
    console.log(id);
    console.log(newFields);
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .updateOne({ "users._id": new MDB.ObjectID(id) }, { $set: newFields }, { upsert: true, multi: false })
            .then(function (document) {
            console.log(document);
            // check if result is positive
            var check = document.result.nModified === 1 && document.result.ok === 1;
            if (check) {
                callback({ status: true, message: "Fields updated", code: 200 });
            }
            else {
                callback({
                    status: false,
                    message: "Contact administrator (user fields update failed)",
                    code: 500
                });
            }
        })["catch"](function (e) {
            console.log(e);
            callback({
                status: false,
                message: "Contact administrator (" + e + ")",
                code: 500
            });
        });
    });
};
// * enf-of-utilities
/**
 * Create user in the system and authenticate it
 * @function create
 * @param { object } user - User object as per { name: string, email: string, pass: string }
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
exports.create = function (user, callback) {
    var token = Generate.token();
    var createUser = {
        name: check_strings_1.dropQuotes(user.name),
        email: check_strings_1.dropQuotes(user.email),
        pass: check_strings_1.dropQuotes(user.pass),
        token: token,
        authDate: new Date()
    };
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("v2")
            .insertOne({ user: createUser })
            .then(function (dbReply) {
            if (dbReply.insertedCount === 1) {
                callback({
                    status: true,
                    message: "User created",
                    code: 200,
                    payload: { token: token }
                });
                MDB.client.close();
            }
            else {
                callback({
                    status: false,
                    message: "User not created",
                    code: 500
                });
                MDB.client.close();
            }
        })["catch"](function (e) { return console.log(e); });
    });
};
/**
 * Check token for existence and validity, zero it in DB if not valid
 * @function checkToken
 * @param { string } token - User ID
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
exports.checkToken = function (token, callback) {
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .aggregate([
            {
                $unwind: {
                    path: "$users",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "users.token": token
                }
            },
            {
                $project: {
                    "users.location": "$_id",
                    "users.authDate": 1,
                    "users.fname": 1,
                    "users._id": 1
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$users"
                }
            }
        ])
            .toArray(function (err, result) {
            // if error return error
            console.log(result);
            if (err) {
                callback({
                    status: false,
                    message: "Contact administrator (" + err.toString() + ")",
                    code: 500
                });
            }
            // if no token found
            else if (result.length === 0) {
                callback({
                    status: false,
                    message: "Unauthorized (token not found)",
                    code: 401
                });
            }
            else {
                // if token found
                var authDate = result[0].authDate;
                var today = new Date();
                var authedHours_1 = Math.round((today - authDate) / 3600000);
                // check time validity
                if (authedHours_1 < 210 && authedHours_1 >= 0) {
                    // if valid
                    callback({
                        status: true,
                        message: "Authorized",
                        code: 200,
                        payload: {
                            id: result[0]._id,
                            location: result[0].location,
                            name: result[0].fname
                        }
                    });
                }
                else {
                    // if not
                    updateUser(result[0]._id, {
                        "users.$.token": "",
                        "users.$.authDate": ""
                    }, function (updateUserResponse) {
                        var response = {
                            status: false,
                            message: "Unauthorized (token expired)",
                            code: 401
                        };
                        if (authedHours_1 < 0) {
                            response.message =
                                "Unauthorized (token expired, authDate in DB later than today)";
                        }
                        callback(response);
                    });
                }
            }
        });
    });
};
/**
 * Get user details by ID
 * @function get
 * @param { string } id - User ID
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
exports.get = function (id, callback) {
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("v2")
            .findOne({ _id: new MDB.ObjectID(id) })
            .then(function (document) {
            var response = {
                status: false,
                message: "User not found",
                code: 203
            };
            if (document) {
                response = {
                    status: true,
                    message: "User is found",
                    code: 200,
                    payload: {
                        name: document.user.name,
                        email: document.user.email
                    }
                };
            }
            callback(response);
        })["catch"](function (e) { return console.log(e); });
    });
};
/**
 * Check if user exists of new
 * @function isUserNew
 * @param { string } user - User email
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
var isUserNew = function (user, callback) {
    MDB.client.connect(function (err) {
        assert_1["default"].equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .aggregate([
            {
                $match: {
                    _id: new MDB.ObjectID(user.location)
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
                    email: user.email
                }
            }
        ])
            .toArray(function (err, result) {
            // no result
            console.log("isUserNew?");
            console.log(result);
            var response = {
                status: false,
                message: "User not found (email is not registered)",
                code: 200
            };
            if (result.length > 1) {
                // if too many results
                response.message = "Contact administrator (too many results)";
                response.code = 500;
            }
            else if (result.length === 1) {
                // match
                response = {
                    status: true,
                    message: "User found",
                    code: 200,
                    payload: { id: result[0]._id }
                };
            }
            callback(response);
        });
    });
};
/**
 * Try login user
 * @function loginAttempt
 * @param { object } user - User in format {email: string, pass: string}
 * @param {string} id - User ID, found before (double check)
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
exports.loginAttempt = function (user, id, callback) {
    MDB.client.connect(function (err) {
        var db = MDB.client.db(dbName);
        db.collection("dev")
            .aggregate([
            {
                $match: {
                    _id: new MDB.ObjectID(user.location),
                    "users._id": new MDB.ObjectID(id)
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
                    _id: new MDB.ObjectID(id),
                    email: user.email,
                    pass: user.pass
                }
            }
        ])
            .toArray(function (err, result) {
            var response = {
                status: false,
                message: "",
                code: 500
            };
            if (err) {
                callback({
                    status: false,
                    message: "Contact administrator (" + err
                        .toString()
                        .replace(/\\"/g, "") + ")",
                    code: 500
                });
            }
            else if (result.length === 1) {
                // match
                // set the fields to update
                var token_1 = Generate.token();
                var newFields = {
                    "users.$.token": token_1,
                    "users.$.authDate": new Date()
                };
                // call updater
                updateUser(result[0]._id, newFields, function (updateUserResponse) {
                    console.log(updateUserResponse);
                    if (updateUserResponse.status) {
                        response = {
                            status: true,
                            message: "User logged in",
                            code: 200,
                            payload: {
                                id: result[0]._id,
                                fName: result[0].fname,
                                token: token_1
                            }
                        };
                    }
                    else {
                        response = updateUserResponse;
                    }
                    callback(response);
                });
            }
            else {
                if (result.length > 1) {
                    // if too many results
                    response.message =
                        "Contact administrator (too many results, not possible at this point)";
                    response.code = 500;
                }
                else {
                    // no result
                    response.message = "User not found (not matching 3 keys)";
                    response.code = 203;
                }
                callback(response);
            }
        });
    });
};
/**
 * Login user
 * @function login
 * @param { object } user - User in format {email: string, pass: string}
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
exports.login = function (user, callback) {
    exports.suCheckLogin(user, function (suCheckResponse) {
        if (suCheckResponse.status) {
            callback(suCheckResponse);
        }
        else {
            isUserNew(user, function (newUserResponse) {
                // if 1 only user found, attempt to login
                if (newUserResponse.status) {
                    exports.loginAttempt(user, newUserResponse.payload.id, function (loginAttemptResponse) {
                        callback(loginAttemptResponse);
                    });
                }
                else {
                    callback(newUserResponse);
                }
            });
        }
    });
};
exports.suCheckLogin = function (user, callback) {
    MDB.client.connect(function (err) {
        // assert.equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection("app")
            .aggregate([
            {
                $match: {
                    "su.email": user.email,
                    "su.pass": user.pass
                }
            }
        ])
            .toArray(function (err, result) {
            var response = {
                status: false,
                message: "SU not found",
                code: 203
            };
            if (result.length > 0) {
                var token_2 = Generate.token();
                var newFields = {
                    "su.token": token_2,
                    "su.authDate": new Date()
                };
                db.collection("app")
                    .updateOne({
                    _id: new MDB.ObjectID(result[0]._id)
                }, { $set: newFields }, { upsert: true })
                    .then(function (document) {
                    response.message = "Error in SU login";
                    response.code = 500;
                    if (document.result.nModified === 1 && document.result.ok === 1) {
                        response = {
                            status: true,
                            message: "SU login is OK",
                            code: 200,
                            payload: {
                                token: token_2
                            }
                        };
                    }
                    callback(response);
                })["catch"](function (e) { return console.log(e); });
            }
            else {
                callback(response);
            }
        });
    });
};
