#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var debug_1 = require("debug");
// import * as https from "https";
var http = require("http");
var dotenv = require("dotenv");
var server = http.createServer(server_1["default"]);
var dotEnv = dotenv.config();
// if (process.env.NODE_ENV === "production") server = https.createServer(app);
console.log(process.env.NODE_ENV);
var normalizePort = function (value) {
    var port = parseInt(value, 10);
    if (isNaN(port)) {
        // named pipe
        return value;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
var onError = function (error) {
    console.log(new Date());
    console.log(error);
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
var onListening = function () {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug_1["default"]("Listening on " + bind);
};
var port = normalizePort(process.env.PORT || "3000");
server_1["default"].set("port", port);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
process.on("uncaughtException", function (err) {
    console.log("start - Caught exception: ");
    console.log(err);
});
