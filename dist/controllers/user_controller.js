"use strict";
exports.__esModule = true;
var User = require("../models/user_model");
var check_strings_1 = require("../modules/check_strings");
/**
 * @param  {IncUserCreateTYPE} props
 * @param  {(arg0:TYPE.apiResponse)=>void} callback
 */
exports.create = function (query, callback) {
    // assign value to avoid 'or empty' clause
    var request = query;
    // request User model
    User.create(request, function (modelResponse) {
        callback(modelResponse);
    });
};
/**
 * @param  {IncUserIdTYPE} props
 * @param  {(arg0:TYPE.apiResponse)=>void} callback
 */
exports.get = function (props, callback) {
    User.get(props, function (modelResponse) {
        callback(modelResponse);
    });
};
/** Login function
 * @param  {object} props - Query and token
 * @return {} - Returns data with callback function
 */
exports.login = function (props, callback) {
    // check fields
    var reply = check_strings_1.checkFieldsLogin({ query: props.query });
    var user = props.query;
    console.log("calling user login");
    // request User model
    User.login(user, function (modelResponse) {
        callback(modelResponse);
    });
    // }
};
