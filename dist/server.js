"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const sslRedirect = require("heroku-ssl-redirect");
const compression = require("compression");
require("./db/mongoose");
// routes
const user_1 = require("./routes/api/user");
const location_1 = require("./routes/api/location");
const post_1 = require("./routes/api/post");
const news_1 = require("./routes/api/news");
const category_1 = require("./routes/api/category");
const verify_1 = require("./routes/api/verify");
const api_1 = require("./routes/api");
const dotEnv = dotenv.config();
const app = express();
process.on("uncaughtException", err => {
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
app.set("view engine", "ejs");
app.use("/api/users", user_1.default);
app.use("/api/locations", location_1.default);
app.use("/api/posts", post_1.default);
app.use("/api/news", news_1.default);
app.use("/api/categories", category_1.default);
app.use("/api", api_1.default);
app.use("/user/verify", verify_1.default);
// * React
//Static file declaration
app.use(express.static(path.join(__dirname, "../client/build/")));
//build mode
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/build/index.html"));
});
// * end of React
exports.default = app;
//# sourceMappingURL=server.js.map