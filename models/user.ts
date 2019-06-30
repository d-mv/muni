import * as assert from "assert";
import * as dotenv from "dotenv";

import * as MDB from "../modules/db_connect";
// import { dropQuotes } from "../modules/check_strings";
// import { compareStringToHash, encodeString } from "../modules/security";

import * as Message from "../modules/response_message";
import * as TYPE from "../src/types";
import { apiResponse } from "client/src/store/types";
// import { indexedObj } from "../src/types";

// constant variables
const dotEnv = dotenv.config();
// db
const dbName = process.env.MONGO_DB || "muni";
// collections
const dbcApp = process.env.MONGO_COL_APP || "app";
const dbcMain = process.env.MONGO_COL_MAIN || "dev";
const dbAppId = process.env.MONGO_APP_ID || "5ce03ad1bb94e55d2ebf2161";

// find user by id
export const getLocationId = (
  _id: string,
  callback: (arg0: apiResponse) => void
) =>
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      database
        .findOne({ "admins._id": new MDB.ObjectId(_id) })
        .then((admins: any) => {
          if (admins) {
            callback(
              Message.positive({
                subj: "Muni user found",
                payload: { _id: _id, location: admins._id }
              })
            );
          } else {
            database
              .findOne({ "users._id": new MDB.ObjectId(_id) })
              .then((users: any) => {
                if (users) {
                  callback(
                    Message.positive({
                      subj: "User found",
                      payload: { _id: _id, location: users._id }
                    })
                  );
                } else {
                  callback(Message.notFound("user"));
                }
              })
              .catch((e: any) =>
                callback(
                  Message.errorMessage({ action: "find users by ID", e })
                )
              );
          }
        })
        .catch((e: any) =>
          callback(Message.errorMessage({ action: "find admins by ID", e }))
        );
    }
  });
