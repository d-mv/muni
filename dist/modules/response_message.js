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
exports.updateMessage = function (props) {
    var response = {
        status: false,
        message: "Error in updating the DB",
        code: 500
    };
    // if OK
    if (props.document.ok === 1) {
        // set response
        (response.status = true),
            (response.message = props.subj + " has been updated/deleted");
        response.code = 200;
        // if not updated
        if (props.document.nModified === 0) {
            response.message = props.subj + " data is the same, no modifications done";
        }
    }
    return response;
};
exports.errorMessage = function (props) {
    return {
        status: false,
        message: "Error in " + props.action + ". Contact administrator. Details: (" + props.e + ")",
        code: 500
    };
};
exports.tooManyResultsMessage = function (subj) {
    return {
        status: false,
        message: "Error in " + subj + ". Too many results",
        code: 500
    };
};
exports.wrongDbMessage = function (subj) {
    return {
        status: false,
        message: "Error in DB/system. Reason: " + subj,
        code: 500
    };
};
exports.alreadyExistsMessage = function (subj) {
    return {
        status: false,
        message: subj + " already exists.",
        code: 200
    };
};
exports.foundMessage = function (subj, payload) {
    return __assign({ status: true, message: subj + " found.", code: 200 }, payload);
};
exports.notAllowedToGetResultsMessage = function (subj) {
    return {
        status: false,
        message: "You don't have sufficient rights to " + subj + ".",
        code: 401
    };
};
exports.notAuthMessage = function (subj) {
    return {
        status: false,
        message: "Not authorized. Reason: " + subj + ".",
        code: 401
    };
};
exports.notFound = function (subj) {
    return {
        status: false,
        message: "No " + subj + " found.",
        code: 203
    };
};
exports.requestError = function (subj) {
    return {
        status: false,
        message: "Error. " + subj,
        code: 406
    };
};
exports.generalError = function (props) {
    return {
        status: false,
        message: props.subj,
        code: props.code
    };
};
exports.positiveMessage = function (props) {
    var message = {
        status: true,
        message: props.subj,
        code: props.code || 200
    };
    if (Array.isArray(props.payload)) {
        return __assign({}, message, { payload: props.payload });
    }
    else {
        return __assign({}, message, props.payload);
    }
};
