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
var security_1 = require("../modules/security");
var models_1 = require("../models");
exports.checkUserById = function (token, callback) {
    return security_1.verifyToken(token).then(function (response) {
        if (response.status) {
            models_1.getLocationId(response.payload._id, function (result) {
                if (result.status) {
                    models_1.getCategories(function (catResult) {
                        if (catResult.status) {
                            var token_1 = security_1.createToken(result.payload._id);
                            var payload = __assign({}, result.payload, { token: token_1, categories: catResult.payload });
                            // attach token
                            callback(__assign({}, result, { payload: payload }));
                        }
                        else {
                            callback(catResult);
                        }
                    });
                }
                else {
                    callback(result);
                }
            });
        }
        else {
            callback(response);
        }
    });
};
exports.login = function (request, callback) {
    models_1.loginUser(request, function (result) {
        // console.log(result);
        if (result.status) {
            // make token
            models_1.getCategories(function (catResult) {
                if (catResult.status) {
                    var token = security_1.createToken(result.payload._id);
                    var payload = __assign({}, result.payload, { token: token, categories: catResult.payload });
                    // attach token
                    callback(__assign({}, result, { payload: payload }));
                }
                else {
                    callback(catResult);
                }
            });
            // return
        }
        else {
            callback(result);
        }
    });
};
