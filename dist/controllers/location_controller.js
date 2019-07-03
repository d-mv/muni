"use strict";
exports.__esModule = true;
var Location = require("../models/location_model");
// import { checkToken } from "../modules/check_token";
var response_message_1 = require("../modules/response_message");
/** Get the list of locations
 * @function list
 * @param  {object} props - Request in the form of {query:{[index:string]:string};token:string}
 * @return {} - Uses callback to return standard apiResponse
 */
exports.list = function (callback) {
    Location.list(function (modelResponse) {
        console.log(modelResponse);
        callback(modelResponse);
    });
};
exports.create = function (query, 
// query: IncNewLocationTYPE,
callback) {
    var nameEnExists = query.name.en ? true : false;
    var photoExists = query.photo ? true : false;
    if (nameEnExists && photoExists) {
        var nameSize = query.name.en.length > 0;
        var photoSize = query.photo.length > 0;
        if (nameSize && photoSize) {
            Location.create(query, function (modelResponse) {
                callback(modelResponse);
            });
        }
        else {
            callback(response_message_1.requestError("English name and/or photo is empty"));
        }
    }
    else {
        callback(response_message_1.requestError("English name and/or photo is missing"));
    }
};
exports.update = function (location, query, callback) {
    // check su token
    Location.update(location, query, function (modelResponse) {
        callback(modelResponse);
    });
};
exports.deleteLocation = function (location, callback) {
    Location.deleteLocation(location, function (modelResponse) {
        callback(modelResponse);
    });
};
