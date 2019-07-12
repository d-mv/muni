import * as dotenv from "dotenv";
// import * as mongoose from "mongoose";

const mongoose = require("mongoose");

const dotEnv = dotenv.config();
const dbUrl: any = process.env.MONGO_LINK;
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
