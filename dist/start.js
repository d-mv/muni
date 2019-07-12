#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const debug_1 = require("debug");
// import * as https from "https";
const http = require("http");
const dotenv = require("dotenv");
let server = http.createServer(server_1.default);
const dotEnv = dotenv.config();
// if (process.env.NODE_ENV === "production") server = https.createServer(app);
console.log(process.env.NODE_ENV);
const normalizePort = (value) => {
    const port = parseInt(value, 10);
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
const onError = (error) => {
    // console.log(new Date());
    console.log(error);
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
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
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug_1.default("Listening on " + bind);
};
const port = normalizePort(process.env.PORT || "3000");
server_1.default.set("port", port);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
process.on("uncaughtException", err => {
    console.log("start - Caught exception: ");
    console.log(err);
});
//# sourceMappingURL=start.js.map