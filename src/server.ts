const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import * as mongodb from "mongodb";
import * as assert from "assert";
const bodyParser = require("body-parser");
import * as dotenv from "dotenv";
const sslRedirect = require("heroku-ssl-redirect");
const compression = require("compression");

// routes
// import router from '../routes';
import apiRouter from "../routes/api_router";
import userRouter from "../routes/user_router";
import locationRouter from "../routes/location_router";
import postRouter from "../routes/post_router";

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// if (process.env.NODE_ENV === "production") {
//   app.all((req: any, res: any, next: any) => {
//     if (!/https/.test(req.protocol)) {
//       res.redirect("https://" + req.headers.host + req.url);
//     } else {
//       return next();
//     }
//   });
// }

app.use("/api/user", userRouter);
app.use("/api/location", locationRouter);
app.use("/api/post", postRouter);
app.use("/api", apiRouter);
// app.use('/', router);

// * React

//Static file declaration
app.use(express.static(path.join(__dirname, "../../client/build/")));

//production mode
// if (process.env.NODE_ENV === "production") {
// app.use(express.static(path.join(__dirname, "../client/build/")));
// console.log(path.join(__dirname, "../client/build/"))
// //
// app.get("/index.html", (req: any, res: any) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });
// }
// console.log(path.join(__dirname, "../client/build/index.h"));

//build mode
app.get("/index.html", (req: any, res: any) => {
  res.sendFile(path.join(__dirname + "../../client/build/index.html"));
});

// * end of React

// set up db
// Connection URL
const defaultUrl = "mongodb://localhost:27017";
const connectUrl = `${process.env.MONGO_URL || defaultUrl}?retryWrites=true`;
// Database Name
const dbName = "muni";
// Create a new MongoClient
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(connectUrl, { useNewUrlParser: true });
// Use connect method to connect to the Server
const connect = client.connect(err => {
  assert.equal(null, err);
  console.log("Connected successfully to DB server");
  const db = client.db(dbName);
  client.close();
});

export default app;
