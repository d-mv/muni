"use strict";
exports.__esModule = true;
exports.showRequest = function (name, headers, params) {
    console.log("\x1b[34m", "router - incoming request:");
    console.log("name");
    console.log(">> " + name);
    console.log(headers);
    console.log(params);
    console.log("");
};
