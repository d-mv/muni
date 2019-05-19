"use strict";
exports.__esModule = true;
exports.showRequest = function (headers, params) {
    console.log("");
    console.log("\x1b[34m", "§ Router - Incoming request:");
    console.log(headers);
    console.log(params);
    console.log("");
};
