"use strict";
exports.__esModule = true;
var Location = require("../models/location_model");
var check_token_1 = require("../modules/check_token");
exports.list = function (props, callback) {
    check_token_1.checkToken(props.token, function (r) {
        if (!r.status) {
            callback(r);
        }
        else {
            // request User model
            Location.list(function (modelResponse) {
                callback(modelResponse);
            });
        }
    });
};
