"use strict";
exports.__esModule = true;
var User = require("../models/user_model");
var check_strings_1 = require("../modules/check_strings");
/** Check if token is valid
 * @param  {string} token
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
exports.checkToken = function (token, callback) {
    // check fields
    if (check_strings_1.dropQuotes(token) === "") {
        callback({
            status: false,
            message: "Unauthorized (no token)",
            code: 401
        });
    }
    else {
        // check if token malformed
        var checkLength = check_strings_1.checkTokenLength(token);
        if (!checkLength.status) {
            callback(checkLength);
        }
        else {
            // check location malformed
            //  const checkIdResult = checkID(props.location);
            //  const check =
            //    dropQuotes(props.location) !== "" && checkIdResult.status;
            //  if (!check) {
            //    callback(checkIdResult);
            //  } else {
            // check with DB
            User.checkToken(token, function (modelResponse) {
                callback(modelResponse);
            });
            //  }
        }
    }
};
