"use strict";
exports.__esModule = true;
var mongodb = require("mongodb");
var dotenv = require("dotenv");
var dotEnv = dotenv.config();
var MongoClient = mongodb.MongoClient;
var connectUrl = (process.env.MONGO_URL ||
    "mongodb://localhost:27017") + "?useNewUrlParser=true";
// const connectUrl = `${process.env.MONGO_URL || 'mongodb://localhost:27017'}?retryWrites=true`
var options = {
    useNewUrlParser: true,
    autoReconnect: true,
    poolSize: 3,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
};
// var conectDate = new Date();
// var count = 0;
// { useNewUrlParser: true, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000 }
var client = new MongoClient(connectUrl, options);
exports.client = client;
var ObjectId = mongodb.ObjectID;
exports.ObjectId = ObjectId;
// Connect to the db
// mongodb.connect(url, options, function(err, db) {
//   if (!err) {
//     console.log("We are connected");
//     db.on("close", function() {
//       console.log("Close");
//     });
//     db.on("reconnect", function() {
//       console.log("Reconnect");
//     });
//   } else {
//     setTimeout(connectWithRetry, 1000);
//     count++;
//     console.log(conectDate + " - Database not connected - " + count);
//   }
// });