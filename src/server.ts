import createError from "http-errors";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import mongodb from "mongodb";
import assert from "assert";

import dotenv from "dotenv";
import compression from "compression";

// routes
import router from "../routes";
import apiRouter from "../routes/api_router";
import userRouter from "../routes/user_router";
import locationRouter from "../routes/loc_router";
import postRouter from '../routes/post_router'

const dotEnv = dotenv.config();
const app = express();

app.use(compression());
// app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/location", locationRouter);
app.use('/api/post',postRouter)
app.use("/api", apiRouter);
app.use("/", router);

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
