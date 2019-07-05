"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var sslRedirect = require("heroku-ssl-redirect");
var compression = require("compression");
require("./db/mongoose");
// routes
var user_1 = require("./routes/api/user");
var location_1 = require("./routes/api/location");
var post_1 = require("./routes/api/post");
var news_1 = require("./routes/api/news");
var category_1 = require("./routes/api/category");
var api_1 = require("./routes/api");
var dotEnv = dotenv.config();
var app = express();
process.on("uncaughtException", function (err) {
    console.log("server - Caught exception: ");
    console.log(new Date());
    console.log(err);
});
app.use(sslRedirect());
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/api/users", user_1["default"]);
app.use("/api/locations", location_1["default"]);
app.use("/api/posts", post_1["default"]);
app.use("/api/news", news_1["default"]);
app.use("/api/categories", category_1["default"]);
app.use('/api', api_1["default"]);
// * React
//Static file declaration
app.use(express.static(path.join(__dirname, "../../client/build/")));
//build mode
app.get("/index.html", function (req, res) {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
});
// * end of React
exports["default"] = app;
