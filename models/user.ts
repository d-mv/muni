import { apiResponse } from "./../client/src/store/types";
import { LoginProps } from "./../src/types";
import * as assert from "assert";
import * as dotenv from "dotenv";

import * as MDB from "../modules/db_connect";

import * as Message from "../modules/response_message";
import { compareToHash } from "../modules/security";
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
                payload: {
                  _id: _id,
                  location: admins._id,
                  name: admins.name,
                  lang: admins.language,
                  type: "muni",
                  pinned: admins.pinned
                }
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
                      payload: {
                        _id: _id,
                        location: users._id,
                        name: users.name,
                        lang: users.language,
                        type: "user",
                        pinned: users.pinned
                      }
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

export const loginUser = (
  request: LoginProps,
  callback: (arg0: apiResponse) => void
) => {
  // try as user
  findUserByEmail(request.email, (res: apiResponse) => {
    console.log(res);
    // payload:
    //  _id: 5d14cd9d6d3a9dc80c10af2e,
    // fName: 'Dwight',
    // lName: 'Homenick',
    // email: 'Abraham.Wolf@hotmail.com',
    // language: 'en',
    // pass: '$2a$10$/qj9kRpekM3wY.mcfjRHtu9RMb4rHEQtuasszibP4EQYAV6gVQcyG',
    // type: 'user',
    // location: 5ce589a00a61b5a9ca9d9caf
    if (res.status) {
      compareToHash(
        request.password,
        res.payload.pass,
        (compareResult: apiResponse) => {
          if (compareResult.status) {
            const { _id, location, type, language, name, pinned } = res.payload;
            callback(
              Message.positive({
                subj: "User authed",
                payload: { _id, location, type, language, name, pinned }
              })
            );
          } else {
            callback(Message.notAuthMessage("Wrong password"));
          }
        }
      );
    } else {
      findMuniByEmail(request.email, (muniResult: apiResponse) => {
        // payload:
        //      _id: 5d14cd9e6d3a9dc80c10af4b,
        // fName: 'Trevion',
        // lName: 'Gislason',
        // email: 'user@muni.com',
        // language: 'עב',
        // pass: '$2a$10$/qj9kRpekM3wY.mcfjRHtu9RMb4rHEQtuasszibP4EQYAV6gVQcyG',
        // type: 'muni',
        // posts: [],
        // location: 5ce589a00a61b5a9ca9d9caf
        if (muniResult.status) {
          compareToHash(
            request.password,
            muniResult.payload.pass,
            (compareResult: apiResponse) => {
              if (compareResult.status) {
                const {
                  _id,
                  location,
                  type,
                  language,
                  name,
                  pinned
                } = muniResult.payload;
                callback(
                  Message.positive({
                    subj: "Admin authed",
                    payload: { _id, location, type, language, name, pinned }
                  })
                );
              } else {
                callback(Message.notAuthMessage("Wrong password"));
              }
            }
          );
        }
      });
    }
  });
};

const findUserByEmail = (
  email: string,
  callback: (arg0: apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      database
        .aggregate([
          {
            $match: {
              "users.email": email
            }
          },
          {
            $addFields: {
              "users.location": "$_id",
              "users.name": "$name",
              "users.pinned": "$pinned"
            }
          },
          {
            $project: {
              name: 0,
              "users.posts": 0
            }
          },
          {
            $unwind: {
              path: "$users",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $replaceRoot: {
              newRoot: "$users"
            }
          },
          {
            $match: {
              email: email
            }
          }
        ])
        .toArray((err: any, result: any) => {
          if (err)
            callback(
              Message.errorMessage({ action: "findUserByEmail", e: err })
            );
          if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("findUserByEmail"));
          } else if (result.length === 1) {
            callback(
              Message.positive({ subj: "User found", payload: result[0] })
            );
          } else {
            callback(Message.notFound("user"));
          }
        });
    }
  });
};
const findMuniByEmail = (
  email: string,
  callback: (arg0: apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      database
        .aggregate([
          {
            $match: {
              "admins.email": email
            }
          },
          {
            $addFields: {
              "admins.location": "$_id",
              "admins.name": "$name",
              "admins.pinned": "$pinned"
            }
          },
          {
            $project: {
              name: 0
            }
          },
          {
            $unwind: {
              path: "$admins",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $replaceRoot: {
              newRoot: "$admins"
            }
          },
          {
            $match: {
              email: email
            }
          }
        ])
        .toArray((err: any, result: any) => {
          if (err)
            callback(
              Message.errorMessage({ action: "findMuniByEmail", e: err })
            );
          if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("findMuniByEmail"));
          } else if (result.length === 1) {
            callback(
              Message.positive({ subj: "Muni found", payload: result[0] })
            );
          } else {
            callback(Message.notFound("user"));
          }
        });
    }
  });
};


export const getCategories = (callback: (arg0: apiResponse)=>void) => {

const database: any = MDB.client.db(dbName).collection(dbcApp);
database
  .aggregate([
    {
      $project: {
        _id: 0,
        categories: 1
      }
    }
  ])
  .toArray((err: any, result: any) => {
    if (err) {
      // if error
      callback(
        Message.errorMessage({
          action: "get categories",
          e: err
        })
      );
    } else if (result.length === 0) {
      // if no - response
      callback(Message.notFound("categories not found"));
    } else if (result.length > 1) {
      // if too many results
      callback(Message.tooManyResultsMessage("get categories"));
    } else {
      callback(
        Message.positive({
          subj: "Categories found",
          payload: result[0].categories
        })
      );
    }
  });


}