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
var security_1 = require("./../modules/security");
var User = require("../models/user_model");
var send_mail_1 = require("../modules/send_mail");
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
        if (modelResponse.status) {
            // console.log(modelResponse);
            // send confirmation email
            var encrypt = security_1.cookieFactory(modelResponse, true);
            // console.log(encrypt);
            var url = "https://muni-dev.herokuapp.com/api/user/verify?id=" + encrypt.token;
            send_mail_1["default"](request.email, url, request.lang);
            callback(__assign({}, modelResponse, { payload: { cookie: encrypt } }));
        }
        else {
            callback(modelResponse);
        }
    });
};
exports.verify = function (id, callback) {
    security_1.verifyId(id, function (verifyResponse) {
        if (verifyResponse.status) {
            var _id = verifyResponse.payload._id;
            console.log(_id);
            User.confirmedEmail(_id, function (modelResponse) {
                // if (modelResponse.status) {
                // }
                callback(modelResponse);
            });
        }
        else {
            callback(verifyResponse);
        }
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
exports.muniLogin = function (props, callback) {
    // check fields
    var user = props.query;
    console.log("calling muni login");
    // request User model
    User.muniLogin(user, function (modelResponse) {
        callback(modelResponse);
    });
    // }
};
exports.update = function (id, query, callback) {
    User.update({ id: id, query: query }, function (modelResponse) {
        callback(modelResponse);
    });
};
