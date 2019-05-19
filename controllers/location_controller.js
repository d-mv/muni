"use strict";
exports.__esModule = true;
var Location = require("../models/location_model");
var Post = require("../models/post_model");
var check_token_1 = require("../modules/check_token");
/** Get the list of locations
 * @function list
 * @param  {object} props - Request in the form of {query:{[index:string]:string};token:string}
 * @return {} - Uses callback to return standard apiResponseTYPE
 */
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
/** Get the list of locations
 * @function posts
 * @param  {object} props - Request in the form of IncPostsListTYPE
 * @return {} - Uses callback to return standard apiResponseTYPE
 */
//  props format:
// const props = {
//   query: {
//     location: "",
// options: {
//     byUser: true,
//     userId: ""}
//   },
//   token: ""
// };
exports.posts = function (props, callback) {
    // chekc token
    check_token_1.checkToken(props.token, function (r) {
        if (!r.status) {
            callback(r);
        }
        else {
            // check if token.location === requested location
            console.log(r.payload.location);
            console.log(props.query.location);
            if (r.payload.location == props.query.location) {
                //  request Post model
                Post.list(props.query, function (modelResponse) {
                    callback(modelResponse);
                });
            }
            else {
                callback({
                    status: false,
                    message: "Location is not authorized",
                    code: 401
                });
            }
        }
    });
};
