const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
import * as dotenv from "dotenv";
const sslRedirect = require("heroku-ssl-redirect");
const compression = require("compression");
require("./db/mongoose");

// routes
const userRouter = require("./routes/api/user");
const locationRouter = require("./routes/api/location");
const postRouter = require("./routes/api/post");
const newsRouter = require("./routes/api/news");
const catRouter = require("./routes/api/category");
const router = require('./routes/api')

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

app.use("/api/users", userRouter);
app.use("/api/locations", locationRouter);
app.use("/api/posts", postRouter);
app.use("/api/news", newsRouter);
app.use("/api/categories", catRouter);
app.use('/api',router)

// * React
//Static file declaration
app.use(express.static(path.join(__dirname, "../../client/build/")));

//build mode
app.get("/index.html", (req: any, res: any) => {
  res.sendFile(path.join(__dirname + "../../client/build/index.html"));
});
// * end of React

export default app;
