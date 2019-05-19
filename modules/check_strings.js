"use strict";
exports.__esModule = true;
/**
 * Drop single/double quote marks
 * @function dropQuotes
 * @param {string} text - Text to check
 * @returns {boolean}
 */
exports.dropQuotes = function (text) {
    var newLine = text.replace(/"|'/g, "");
    return newLine;
};
/**
 * Check if string is empty
 * @function stringIsEmpty
 * @param {string} field - String of the field to check
 * @returns {boolean}
 */
var stringIsEmpty = function (field) {
    var response = field === '' || field === "" || field === "''" ? false : true;
    return response;
};
/**
 * Check if fields are empty
 * @function fieldsCheck
 * @param {object} fields - Fields with/without values
 * @returns {object} - {  status: boolean, message: string}
 */
var fieldsCheckIfEmpty = function (fields, scoreMax) {
    if (scoreMax === void 0) { scoreMax = 3; }
    var response;
    var score = 0;
    Object.keys(fields).map(function (field) {
        stringIsEmpty(fields["" + field]) ? score += 1 : null;
    });
    if (score === 0) {
        response = { status: false, message: 'The request is empty', code: 400 };
    }
    else if (score < scoreMax) {
        response = { status: false, message: 'The request is incomplete', code: 400 };
    }
    else {
        response = { status: true, message: '', code: 200 };
    }
    return response;
};
/**
 * Check the fields of query
 * @function checkFields
 * @param {object} props - Request { query: { name: string, email: string, pass: string } | {}}
 * @returns {object} - {status: boolean, message: string}
 */
exports.checkFields = function (props) {
    var fields = 'name' in props.query && "email" in props.query && "pass" in props.query;
    var response;
    if (fields) {
        response = fieldsCheckIfEmpty(props.query);
    }
    else {
        response = { status: false, message: 'Fields are missing in the request', code: 400 };
    }
    return response;
};
exports.checkFieldsLogin = function (props) {
    var fields = "email" in props.query && "pass" in props.query;
    var response;
    if (fields) {
        response = fieldsCheckIfEmpty(props.query, 2);
    }
    else {
        response = { status: false, message: 'Fields are missing in the request', code: 400 };
    }
    return response;
};
/**
 * Check the ID string
 * @function checkID
 * @param {string} id - Check if ID is 24 characters long
 * @returns {object} - {status: boolean, message: string}
 */
exports.checkID = function (id) {
    var response = {
        status: false,
        message: "ID is malformed (shorter/longer)",
        code: 400
    };
    if (id.length === 24) {
        response = { status: true, message: "ID is in proper format", code: 200 };
    }
    return response;
};
/**
 * Check the token
 * @function checkToken
 * @param {string} token - Check if ID is 24 characters long
 * @returns {object} - {status: boolean, message: string}
 */
exports.checkTokenLength = function (token) {
    var response = {
        status: false,
        message: "Token is malformed (shorter/longer)",
        code: 400
    };
    if (token.length === 26) {
        response = {
            status: true,
            message: "Token is in proper format",
            code: 200
        };
    }
    return response;
};
