"use strict";
exports.__esModule = true;
var mongodb = require("mongodb");
var dotenv = require("dotenv");
var dotEnv = dotenv.config();
var MongoClient = mongodb.MongoClient;
var connectUrl = (process.env.MONGO_URL ||
    "mongodb://localhost:27017") + "?useNewUrlParser=true";
// const connectUrl = `${process.env.MONGO_URL || 'mongodb://localhost:27017'}?retryWrites=true`
var client = new MongoClient(connectUrl, { useNewUrlParser: true, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000 });
exports.client = client;
var ObjectId = mongodb.ObjectID;
exports.ObjectId = ObjectId;
