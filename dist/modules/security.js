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
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var dotenv = require("dotenv");
var User = require("../models/user_model");
var Message = require("./response_message");
var dotEnv = dotenv.config();
var passPhrase = process.env.SECRET;
// defaults
var expiresInValue = 2592000;
/**
 * Encode a string
 * @function encodeString
 * @param  {string} text - A string of text to encode
 * @callback - Function to return result or error message (apiResponseTYPE | intApiResponseTYPE)
 */
exports.encodeString = function (text, callback) {
    // generate salt
    bcrypt.genSalt(10, function (saltErr, salt) {
        if (saltErr) {
            // if error
            callback(Message.errorMessage({ action: "salt generation", e: saltErr }));
        }
        else {
            // generate hash
            bcrypt.hash(text, salt, function (hashErr, hash) {
                // if error
                if (hashErr) {
                    callback(Message.errorMessage({
                        action: "hash generation",
                        e: hashErr
                    }));
                }
                else {
                    callback({ status: true, payload: hash });
                }
            });
        }
    });
};
/**
 * Compare a string with encoded string
 * @function compareStringToHash
 * @param  {string} text - A string of text to compare
 * @param  {string} hash - A hash of text to compare
 * @callback - Function to return result or error message (apiResponse | boolean)
 */
exports.compareStringToHash = function (text, hash, callback) {
    bcrypt.compare(text, hash, function (err, res) {
        if (err) {
            callback(Message.errorMessage({ action: "hash compare", e: err }));
        }
        else {
            callback(res);
        }
    });
};
/**
 * Function to decipher the token and check it for validity, expiry and if owner is SU
 *@function checkToken
 * @param {string} token
 * @callback - Callback function to return the message w/payload or not
 */
exports.checkToken = function (token, callback, nodata) {
    jwt.verify(token, passPhrase, function (err, decoded) {
        if (err) {
            callback(Message.errorMessage({ action: "reading token", e: err }));
        }
        else {
            var now = new Date();
            var expiry = new Date(decoded.exp * 1000);
            var authedHours = Math.round((expiry - now) / 3600000);
            // check time validity
            if (authedHours <= 720 && authedHours >= 0) {
                // good
                var response_1 = {
                    status: true,
                    message: "Token is valid",
                    code: 200
                };
                // User.isUserSuper(decoded.id, (modelResponse: boolean) => {
                //   response.level = modelResponse ? "su" : "";
                //   if (!modelResponse) {
                // user is not super
                User.getUserById(decoded.id, function (getUserByIdResponse) {
                    if (getUserByIdResponse.status) {
                        if (nodata) {
                            callback(Message.foundMessage("token OK", {
                                payload: {
                                    id: decoded.id,
                                    lang: getUserByIdResponse.language,
                                    type: getUserByIdResponse.type
                                }
                            }));
                        }
                        else {
                            User.getLocationInfo(decoded.id, function (modelReply) {
                                console.log("getUserByIdResponse");
                                // console.log(getUserByIdResponse);
                                var replyPayload = __assign({}, modelReply.payload, { lang: getUserByIdResponse.language, type: getUserByIdResponse.type });
                                callback(__assign({}, modelReply, { payload: replyPayload }));
                            });
                        }
                        //   } else {
                        //     callback(getUserByIdResponse);
                        //   }
                        // });
                    }
                    else {
                        callback(__assign({}, response_1, { payload: { id: decoded.id } }));
                    }
                });
            }
            else if (authedHours > 720) {
                // unauth
                callback(Message.notAuthMessage("token expired"));
            }
            else {
                // smth wrong
                callback(Message.wrongDbMessage("The difference between 'issued' and 'expired' is wrong"));
            }
        }
    });
};
/**
 * Function to create encoded cookies
 * @function cookieFactory
 * @param {object} message - User details
 * @return {object} - Returns object with token, cookie options, result code & message from input
 */
exports.cookieFactory = function (message, createId) {
    console.log("message");
    // console.log(message);
    var code = message.code;
    var token = "";
    var expire = "";
    var options = {
        expire: expire,
        httpOnly: false,
        secure: false
    };
    if (message.status) {
        var id = message.payload._id;
        var now = new Date(Date.now() + 2592000 * 1000);
        if (createId) {
            now = new Date(Date.now() + 86400 * 1000);
        }
        expire = now.toUTCString();
        delete message.payload;
        delete message.code;
        var expiresInValue_1 = createId ? 86400 : 2592000;
        token = jwt.sign({ id: id }, passPhrase, {
            expiresIn: expiresInValue_1 // expires in 30 days in seconds
        });
        options = {
            expire: expire,
            httpOnly: true,
            secure: true
        };
    }
    return { token: token, options: options, code: code, message: message };
};
/**
 * Function to decipher the id and check it for validity and expiry
 * @function verifyId
 * @param {string} id
 * @returns {Object} - Uses callback function to return the message w/payload or not
 */
exports.verifyId = function (id, callback) {
    jwt.verify(id, passPhrase, function (err, decoded) {
        if (err) {
            callback(Message.errorMessage({ action: "reading ID", e: err }));
        }
        else {
            var now = new Date();
            var expiry = new Date(decoded.exp * 1000);
            var authedHours = Math.round((expiry - now) / 3600000);
            // check time validity
            if (authedHours <= 24 && authedHours >= 0) {
                // good
                var response = {
                    status: true,
                    message: "ID is valid",
                    code: 200,
                    payload: {
                        _id: decoded.id
                    }
                };
                callback(response);
            }
            else if (authedHours > 24) {
                // unauth
                callback(Message.notAuthMessage("id is expired"));
            }
            else {
                // smth wrong
                callback(Message.wrongDbMessage("The difference between 'issued' and 'expired' is wrong"));
            }
        }
    });
};
// v2 method
exports.verifyToken = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, jwt.verify(id, passPhrase, function (err, decoded) {
                if (err) {
                    return Message.errorMessage({ action: "reading ID", e: err });
                }
                else {
                    var now = new Date();
                    var expiry = new Date(decoded.exp * 1000);
                    var authedHours = Math.round((expiry - now) / 3600000);
                    // check time validity
                    if (authedHours <= 720 && authedHours >= 0) {
                        // good
                        return Message.positive({
                            subj: "ID is valid",
                            code: 200,
                            payload: { _id: decoded.id }
                        });
                    }
                    else if (authedHours > 720) {
                        // unauth
                        return Message.notAuthMessage("id is expired");
                    }
                    else {
                        // smth wrong
                        return Message.wrongDbMessage("The difference between 'issued' and 'expired' is wrong");
                    }
                }
            })];
    });
}); };
// v2 method
exports.compareToHash = function (text, hash, callback) {
    bcrypt.compare(text, hash, function (err, res) {
        if (err) {
            callback(Message.errorMessage({ action: "hash compare", e: err }));
        }
        else if (res) {
            callback(Message.positive({ subj: "Deciphered:OK" }));
        }
        else {
            callback(Message.negative({ subj: "Wrong password" }));
        }
    });
};
// v2 method
exports.createToken = function (id) {
    return jwt.sign({ id: id }, passPhrase, {
        expiresIn: expiresInValue // expires in 30 days in seconds
    });
};
