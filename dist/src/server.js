"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var mongodb = require("mongodb");
var assert = require("assert");
var dotenv = require("dotenv");
// import compression from "compression";
var compression = require("compression");
// routes
// import router from '../routes';
var api_router_1 = require("../routes/api_router");
var user_router_1 = require("../routes/user_router");
var location_router_1 = require("../routes/location_router");
var post_router_1 = require("../routes/post_router");
var dotEnv = dotenv.config();
var app = express();
process.on("uncaughtException", function (err) {
    console.log("server - Caught exception: ");
    console.log(new Date());
    console.log(err);
});
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", user_router_1["default"]);
app.use("/api/location", location_router_1["default"]);
app.use("/api/post", post_router_1["default"]);
app.use("/api", api_router_1["default"]);
// app.use('/', router);
// * React
//Static file declaration
app.use(express.static(path.join(__dirname, "../../client/build")));
//production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/build/index.html")));
    //
    app.get("/index.html", function (req, res) {
        console.log(path.join(__dirname, "../../client/build/index.html"));
        res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });
}
//build mode
app.get("/index.html", function (req, res) {
    res.sendFile(path.join(__dirname + "../client/public/index.html"));
});
// * end of React
// set up db
// Connection URL
var defaultUrl = "mongodb://localhost:27017";
var connectUrl = (process.env.MONGO_URL || defaultUrl) + "?retryWrites=true";
// Database Name
var dbName = "muni";
// Create a new MongoClient
var MongoClient = mongodb.MongoClient;
var client = new MongoClient(connectUrl, { useNewUrlParser: true });
// Use connect method to connect to the Server
var connect = client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to DB server");
    var db = client.db(dbName);
    client.close();
});
exports["default"] = app;
