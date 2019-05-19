"use strict";
exports.__esModule = true;
var User = require("../models/user_model");
var check_token_1 = require("../modules/check_token");
var check_strings_1 = require("../modules/check_strings");
/**
 * @param  {IncUserCreateTYPE} props
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
exports.create = function (props, callback) {
    // check fields
    var reply = check_strings_1.checkFields({ query: props.query });
    // if negative reply immediately
    if (!reply.status) {
        callback(reply);
    }
    else {
        // assign value to avoid 'or empty' clause
        var user = props.query;
        // request User model
        User.create(user, function (modelResponse) {
            callback(modelResponse);
        });
    }
};
/**
 * @param  {IncUserIdTYPE} props
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
exports.get = function (props, callback) {
    // check auth
    check_token_1.checkToken(props.token, function (r) {
        if (!r.status) {
            callback(r);
        }
        else {
            // check if ID is malformed
            var idCheckResult = check_strings_1.checkID(props.id);
            if (idCheckResult.status) {
                // request User model
                User.get(props.id, function (modelResponse) {
                    callback(modelResponse);
                });
            }
            else {
                callback(idCheckResult);
            }
        }
    });
};
/**
 * @param  {string} token
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
exports.check = function (token, callback) {
    // check auth
    check_token_1.checkToken(token, function (r) {
        callback(r);
    });
};
// * done!!!!
/** Login function
 * @param  {object} props - Query and token
 * @return {} - Returns data with callback function
 */
exports.login = function (props, callback) {
    // check fields
    var reply = check_strings_1.checkFieldsLogin({ query: props.query });
    var idCheckResult = check_strings_1.checkID(props.query.location);
    var check = reply.status && idCheckResult.status;
    // if negative reply immediately
    if (!check) {
        reply ? callback(idCheckResult) : callback(reply);
    }
    else {
        // assign value to avoid 'or empty' clause
        var user = props.query;
        // request User model
        User.login(user, function (modelResponse) {
            callback(modelResponse);
        });
    }
};
