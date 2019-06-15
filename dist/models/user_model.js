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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var assert = require("assert");
var dotenv = require("dotenv");
var MDB = require("../modules/db_connect");
var check_strings_1 = require("../modules/check_strings");
var security_1 = require("../modules/security");
var Message = require("../modules/response_message");
// constant variables
var dotEnv = dotenv.config();
// db
var dbName = process.env.MONGO_DB || "muni";
// collections
var dbcApp = process.env.MONGO_COL_APP || "app";
var dbcMain = process.env.MONGO_COL_MAIN || "dev";
var dbAppId = process.env.MONGO_APP_ID || "5ce03ad1bb94e55d2ebf2161";
// find user by id
exports.getUserById = function (id, callback) {
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
                        "users._id": new MDB.ObjectId(id)
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
                        _id: new MDB.ObjectId(id)
                    }
                }
            ])
                .toArray(function (e, res) {
                if (e) {
                    callback(Message.notFound("user"));
                }
                else {
                    if (res.length === 0) {
                        callback(Message.notFound("user"));
                    }
                    else {
                        callback(Message.foundMessage("user", {
                            language: res[0].language,
                            type: res[0].type
                        }));
                    }
                }
            });
        }
    });
};
/**
 * Update user fields
 * @function updateUser
 * @param {string} id - User ID, found before (double check)
 * @param { object } newFields - New fields to update
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
exports.updateUser = function (id, newFields, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        var database = MDB.client.db(dbName).collection(dbcMain);
        database
            .updateOne({ "users._id": new MDB.ObjectId(id) }, { $set: newFields }, { upsert: true, multi: false })
            .then(function (document) {
            // check if result is positive adn callback result
            callback(Message.updateMessage({
                subj: "User",
                document: {
                    ok: document.result.ok,
                    nModified: document.result.nModified
                }
            }));
        })["catch"](function (e) {
            assert.equal(null, e);
            callback(Message.errorMessage({ action: "user update", e: e }));
        });
    });
};
// find user by email
var checkIfEmailNew = function (email, callback, app) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        assert.equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection(dbcMain)
            .aggregate([
            {
                $match: {
                    "users.email": email
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
            .toArray(function (e, res) {
            if (e || res.length > 0) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    });
};
exports.verifyUser = function (_id, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database_1 = MDB.client.db(dbName).collection(dbcMain);
            database_1
                .aggregate([
                {
                    $unwind: {
                        path: "$newUsers",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$newUsers"
                    }
                },
                {
                    $match: {
                        _id: new MDB.ObjectId(_id)
                    }
                }
            ])
                .toArray(function (e, result) {
                if (e) {
                    callback(Message.errorMessage({ action: "temp user search", e: e }));
                }
                else if (result.length === 0) {
                    // not found
                    callback(Message.notFound("user"));
                }
                else if (result.length > 1) {
                    // houston, we've got problem
                    callback(Message.tooManyResultsMessage("temp user search"));
                }
                else {
                    // bingo
                    var newUser = {
                        fName: result[0].fName,
                        lName: result[0].lName,
                        email: result[0].email,
                        pass: result[0].pass,
                        posts: [],
                        settings: result[0].settings
                    };
                    database_1 = MDB.client.db(dbName).collection(dbcMain);
                    database_1
                        .updateOne({ _id: new MDB.ObjectId(result[0].location) }, { $push: { users: newUser } })
                        .then(function (dbReply) {
                        // if OK
                        if (dbReply.result.nModified === 1 && dbReply.result.ok === 1) {
                            callback({
                                status: true,
                                message: "User created",
                                code: 200,
                                payload: {
                                    id: _id
                                }
                            });
                        }
                        else {
                            // if not OK
                            callback({
                                status: false,
                                message: "User not created",
                                code: 500
                            });
                        }
                    })["catch"](function (e) {
                        assert.equal(null, e);
                        callback(Message.errorMessage({ action: "user create", e: e }));
                    });
                }
            });
        }
    });
};
/**
 * Get user details by user ID
 * @function get
 * @param { object } props - Search ID and ID of user, requested the information
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
exports.get = function (props, callback) {
    console.log(props);
    // check if userRequested is a SU
    exports.isUserSuper(props.userRequested, function (isSuper) {
        // get requested user
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
                            "users._id": new MDB.ObjectId(props.id)
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
                            _id: new MDB.ObjectId(props.id)
                        }
                    }
                ])
                    .toArray(function (e, result) {
                    if (e) {
                        callback(Message.errorMessage({ action: "user search", e: e }));
                    }
                    else if (result.length === 0) {
                        // not found
                        callback(Message.notFound("user"));
                    }
                    else if (result.length > 1) {
                        // houston, we've got problem
                        callback(Message.tooManyResultsMessage("user search"));
                    }
                    else {
                        // bingo
                        // allowed?
                        if (isSuper || result[0]._id == props.userRequested) {
                            // return result
                            callback({
                                status: true,
                                message: "User " + result[0]._id + ", found " + result[0].posts.length + " post(s)",
                                code: 200,
                                payload: result[0].posts
                            });
                        }
                        else {
                            // no rights
                            callback(Message.notAllowedToGetResultsMessage("get this information"));
                        }
                    }
                });
            }
        });
    });
};
/**
 * Check if user exists of new
 * @function isUserNew
 * @param { string } user - User email
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
exports.isUserNew = function (user, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        assert.equal(null, err);
        var db = MDB.client.db(dbName);
        db.collection(dbcMain)
            .aggregate([
            {
                $match: {
                    "users.email": user.email
                }
            },
            {
                $addFields: {
                    "users.location": "$_id"
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
                code: 404
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
                    payload: result[0]
                };
            }
            callback(response);
        });
    });
};
// ** done
/**
 * Check if user is a super
 * @function isUserSuper
 * @param {string} userId - ID of interest
 * @return {boolean} - Answer if user is a super one
 */
exports.isUserSuper = function (userId, callback) {
    MDB.client.connect(function (err) { return __awaiter(_this, void 0, void 0, function () {
        var database;
        return __generator(this, function (_a) {
            database = MDB.client.db(dbName).collection(dbcApp);
            database
                .findOne({
                "su._id": new MDB.ObjectId(userId)
            })
                .then(function (document) {
                var isSuper = false;
                if (document) {
                    isSuper = true;
                }
                callback(isSuper);
            });
            return [2 /*return*/];
        });
    }); });
    // return isSU
};
/**
 * Create user in the system and authenticate it
 * @function create
 * @param { object } user - User object as per { name: string, email: string, pass: string }
 * @returns {TYPE.apiResponse}
 */
exports.create = function (request, callback) {
    // const token = Generate.token();
    var id = new MDB.ObjectId();
    checkIfEmailNew(request.email, function (emailIsNew) {
        if (emailIsNew) {
            security_1.encodeString(check_strings_1.dropQuotes(request.pass), function (encoded) {
                if (!encoded.status) {
                    // if error - callback error
                    //  @ts-ignore - in this case it's always TYPE.apiResponse
                    callback(encoded);
                }
                else {
                    // if created - proceed with creating
                    console.log(request);
                    // set a user variable
                    var createUser_1 = {
                        _id: id,
                        location: new MDB.ObjectId(request.location),
                        fName: check_strings_1.dropQuotes(request.fName),
                        lName: check_strings_1.dropQuotes(request.lName),
                        email: check_strings_1.dropQuotes(request.email),
                        pass: encoded.payload,
                        language: check_strings_1.dropQuotes(request.lang),
                        posts: [],
                        settings: {}
                    };
                    // store it database
                    MDB.client.connect(function (err) {
                        assert.equal(null, err);
                        if (err) {
                            callback(Message.errorMessage({ action: "connection to DB", e: err }));
                        }
                        else {
                            var database = MDB.client
                                .db(dbName)
                                .collection(dbcApp);
                            database
                                .updateOne({ _id: new MDB.ObjectId(dbAppId) }, { $push: { newUsers: createUser_1 } })
                                .then(function (dbReply) {
                                // if OK
                                if (dbReply.result.nModified === 1 &&
                                    dbReply.result.ok === 1) {
                                    //                       console.log("object")
                                    // console.log(id)
                                    callback({
                                        status: true,
                                        message: "Temp user created",
                                        code: 200,
                                        payload: {
                                            _id: id
                                        }
                                    });
                                }
                                else {
                                    // if not OK
                                    callback({
                                        status: false,
                                        message: "User not created",
                                        code: 500
                                    });
                                }
                            })["catch"](function (e) {
                                assert.equal(null, e);
                                callback(Message.errorMessage({ action: "user create", e: e }));
                            });
                        }
                    });
                }
            });
        }
        else {
            // if already exists
            callback(Message.alreadyExistsMessage("Email"));
        }
    }, true);
};
/**
 * Login user
 * @function login
 * @param { object } user - User in format {email: string, pass: string}
 * @callback loginCallback - Function to return result (TYPE.apiResponse)
 */
exports.login = function (user, callback) {
    // try login as SU
    exports.suLoginAttempt(user, function (suCheckResponse) {
        // callback if logged in or wrong password
        if (suCheckResponse.status || suCheckResponse.code === 401) {
            callback(suCheckResponse);
        }
        else {
            // check if user exists
            exports.isUserNew(user, function (newUserResponse) {
                // if 1 only user found, attempt to login
                if (newUserResponse.status) {
                    // check login data
                    // if found > check password
                    security_1.compareStringToHash(user.pass, newUserResponse.payload.pass, function (response) {
                        if (typeof response === "boolean") {
                            // if it's true/false
                            if (response) {
                                // if matching
                                var lang_1 = newUserResponse.payload.language;
                                exports.getLocationInfo(newUserResponse.payload._id, function (dataResponse) {
                                    // console.log("dataResponse");
                                    // console.log(Object.keys(dataResponse));
                                    var replyPayload = __assign({}, dataResponse.payload, { lang: lang_1 });
                                    callback(__assign({}, dataResponse, { payload: replyPayload }));
                                });
                            }
                            else {
                                // if not matching
                                callback(Message.generalError({
                                    subj: "Wrong password",
                                    code: 401
                                }));
                            }
                        }
                        else {
                            // if it's error
                            callback(response);
                        }
                    });
                }
                else {
                    // callback with result
                    callback(newUserResponse);
                }
            });
        }
    });
};
/**
 * Login set of credentials
 * @typedef {Object} IncLoginTYPE
 * @property {string} email - Email
 * @property {string} pass - Password
 * @property {string} [location] -Location - optional for super-user
 */
/**
 * Attempt to login as super-user
 * @function suLoginAttempt
 * @param { IncLoginTYPE } user - Attempt to login with {@link IncLoginType}
 * @callback suLoginAttemptCallback - Function to return result (TYPE.apiResponse)
 */
exports.suLoginAttempt = function (user, callback) {
    console.log("inside syLoginAttempt");
    // connect to DB
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcApp);
            // check if user exists
            database
                .aggregate([
                {
                    $match: {
                        "su.email": user.email
                    }
                }
            ])
                .toArray(function (err, result) {
                if (err) {
                    // if error
                    callback(Message.errorMessage({ action: "SU match", e: err }));
                }
                else if (result.length === 0) {
                    // if no - response
                    callback(Message.notFound("SU not found"));
                }
                else {
                    // try to login if yes
                    security_1.compareStringToHash(user.pass, result[0].su.pass, function (response) {
                        // console.log(hash)
                        // console.log(result[0].su.pass);
                        if (typeof response === "boolean") {
                            // if it's true/false
                            if (response) {
                                // if matching
                                callback(Message.positiveMessage({
                                    subj: "SU login is OK",
                                    payload: {
                                        level: "su",
                                        payload: {
                                            id: result[0].su._id
                                        }
                                    }
                                }));
                            }
                            else {
                                // if not matching
                                callback(Message.generalError({
                                    subj: "SU: wrong password",
                                    code: 401
                                }));
                            }
                        }
                        else {
                            // if it's error
                            callback(response);
                        }
                    });
                }
            });
        }
    });
};
/**
 * Login set of credentials
 * @typedef {Object} IncLoginTYPE
 * @property {string} email - Email
 * @property {string} pass - Password
 * @property {string} [location] -Location - optional for super-user
 */
/**
 * Attempt to login as super-user
 * @function suLoginAttempt
 * @param { IncLoginTYPE } user - Attempt to login with {@link IncLoginType}
 * @param {string} id - Location ID
 * @callback loginAttemptCallback - Function to return result (TYPE.apiResponse)
 */
exports.loginAttempt = function (user, id, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcMain);
            console.log(user);
            database
                .aggregate([
                {
                    $match: {
                        _id: new MDB.ObjectId(user.location)
                    }
                },
                {
                    $addFields: {
                        "users.location": "$_id",
                        "users.localPosts": "$users.posts"
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
                        _id: new MDB.ObjectId(id),
                        email: user.email
                    }
                },
                {
                    $project: {
                        fName: 1,
                        lName: 1,
                        avatar: 1,
                        email: 1,
                        pass: 1,
                        location: 1,
                        localPosts: 1,
                        pinned: 1
                    }
                }
            ])
                .toArray(function (err, result) {
                if (err) {
                    // if error
                    callback(Message.errorMessage({ action: "user match", e: err }));
                }
                else if (result.length === 0) {
                    // if no - response
                    callback(Message.notFound("user not found"));
                }
                else if (result.length > 1) {
                    // if too many results
                    callback(Message.tooManyResultsMessage("user matching"));
                }
                else {
                    // if found > check password
                    security_1.compareStringToHash(user.pass, result[0].pass, function (response) {
                        if (typeof response === "boolean") {
                            // if it's true/false
                            if (response) {
                                // if matching
                                // getLocationInfo()
                                callback(Message.positiveMessage({
                                    subj: "User login is OK",
                                    payload: {
                                        payload: {
                                            id: result[0]._id,
                                            location: result[0].location,
                                            posts: result[0].localPosts
                                        }
                                    }
                                }));
                            }
                            else {
                                // if not matching
                                callback(Message.generalError({
                                    subj: "Wrong password",
                                    code: 401
                                }));
                            }
                        }
                        else {
                            // if it's error
                            callback(response);
                        }
                    });
                }
            });
        }
    });
};
exports.getLocationInfo = function (user, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database = MDB.client.db(dbName).collection(dbcApp);
            var categories_1;
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
                    callback(Message.errorMessage({ action: "get categories", e: err }));
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
                    categories_1 = result[0].categories;
                }
            });
            database = MDB.client.db(dbName).collection(dbcMain);
            database
                .aggregate([
                {
                    $match: {
                        "users._id": new MDB.ObjectId(user)
                    }
                },
                {
                    $project: {
                        name: 1,
                        location: "$_id",
                        pinned: 1,
                        municipality: 1,
                        _id: 0,
                        posts: {
                            $reduce: {
                                input: "$users.posts",
                                initialValue: [],
                                "in": {
                                    $concatArrays: ["$$value", "$$this"]
                                }
                            }
                        }
                    }
                }
            ])
                .toArray(function (err, result) {
                if (err) {
                    // if error
                    callback(Message.errorMessage({ action: "user match", e: err }));
                }
                else if (result.length === 0) {
                    // if no - response
                    callback(Message.notFound("user not found"));
                }
                else if (result.length > 1) {
                    // if too many results
                    callback(Message.tooManyResultsMessage("user matching"));
                }
                else {
                    // if found
                    callback(Message.positiveMessage({
                        subj: "User login is OK",
                        payload: {
                            payload: __assign({ _id: user, categories: categories_1 }, result[0])
                        }
                    }));
                }
            });
        }
    });
};
exports.confirmedEmail = function (_id, callback) {
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            callback(Message.errorMessage({ action: "connection to DB", e: err }));
        }
        else {
            var database_2 = MDB.client.db(dbName).collection(dbcApp);
            database_2
                .aggregate([
                {
                    $unwind: {
                        path: "$newUsers",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: "$newUsers"
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
                    callback(Message.errorMessage({ action: "user match", e: err }));
                }
                else if (result.length === 0) {
                    // if no - response
                    callback(Message.notFound("user not found"));
                }
                else if (result.length > 1) {
                    // if too many results
                    callback(Message.tooManyResultsMessage("user matching"));
                }
                else {
                    // if found
                    var user_1 = result[0];
                    console.log("this is new user");
                    console.log(user_1);
                    var location_1 = user_1.location;
                    delete user_1.location;
                    database_2
                        .update({ _id: new MDB.ObjectId(dbAppId) }, { $pull: { newUsers: { _id: new MDB.ObjectId(_id) } } })
                        .then(function (document) {
                        // process response
                        database_2 = MDB.client.db(dbName).collection(dbcMain);
                        database_2
                            .updateOne({
                            _id: new MDB.ObjectId(location_1)
                        }, { $push: { users: user_1 } })
                            .then(function (documentCreate) {
                            // check if result is positive adn callback result
                            callback(Message.updateMessage({
                                subj: "User confirmed",
                                document: {
                                    ok: documentCreate.result.ok,
                                    nModified: documentCreate.result.nModified
                                }
                            }));
                        })["catch"](function (e) {
                            assert.equal(null, e);
                            callback(Message.errorMessage({
                                action: "user confirmation (creation in Main)",
                                e: e
                            }));
                        });
                    })["catch"](function (e) {
                        assert.equal(null, e);
                        callback(Message.errorMessage({ action: "temp user removal", e: e }));
                    });
                }
            });
        }
    });
};
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
    var setRequest = {};
    var fields = request.query;
    // prepare the request
    Object.keys(fields).forEach(function (key) {
        setRequest["users.$[reply]." + key] = fields[key];
        // .match(/\w/g).join('');
    });
    MDB.client.connect(function (err) {
        assert.equal(null, err);
        if (err) {
            // return error with connection
            callback(Message.errorMessage({ action: "connection to DB (u1)", e: err }));
        }
        else {
            // set database
            var database = MDB.client.db(dbName).collection(dbcMain);
            // update
            database
                .updateMany({ "users._id": new MDB.ObjectId(request.id) }, { $set: __assign({}, setRequest) }, {
                arrayFilters: [{ "reply._id": new MDB.ObjectId(request.id) }]
            })
                .then(function (document) {
                // process response
                callback(Message.updateMessage({
                    subj: "User",
                    document: {
                        ok: document.result.ok,
                        nModified: document.result.nModified
                    }
                }));
            })["catch"](function (e) {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "user update", e: e }));
            });
        }
    });
};
