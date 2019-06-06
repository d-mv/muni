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
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var dotenv = require("dotenv");
var User = require("../models/user_model");
var Message = require("./response_message");
var dotEnv = dotenv.config();
var passPhrase = process.env.SECRET;
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
exports.checkToken = function (token, callback) {
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
                User.isUserSuper(decoded.id, function (modelResponse) {
                    response_1.level = modelResponse ? "su" : "";
                    if (!modelResponse) {
                        // user is not super
                        User.getLocationInfo(decoded.id, function (modelReply) {
                            callback(__assign({}, response_1, { payload: __assign({}, modelReply) }));
                        });
                    }
                    else {
                        callback(__assign({}, response_1, { payload: { id: decoded.id } }));
                    }
                    ;
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
exports.cookieFactory = function (message) {
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
        expire = now.toUTCString();
        delete message.payload;
        delete message.code;
        token = jwt.sign({ id: id }, passPhrase, {
            expiresIn: 2592000 // expires in 30 days in seconds
        });
        options = {
            expire: expire,
            httpOnly: true,
            secure: true
        };
    }
    return { token: token, options: options, code: code, message: message };
};
