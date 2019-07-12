"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
// import * as mongoose from "mongoose";
const mongoose = require("mongoose");
const dotEnv = dotenv.config();
const dbUrl = process.env.MONGO_LINK;
mongoose
    .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => {
    console.log("connected to database");
})
    .catch(() => {
    console.log("failed connected to database");
});
//# sourceMappingURL=mongoose.js.map