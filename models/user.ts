import { apiResponse, LoginProps } from "../src/types";
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
            findMuniUserByID(_id, (response: apiResponse) => {
              if (response.status) {
                callback(
                  Message.positive({
                    subj: "Muni user found",
                    payload: {
                      _id: _id,
                      location: admins._id,
                      name: admins.name,
                      type: "muni",
                      pinned: admins.pinned,
                      language: response.payload.language
                    }
                  })
                );
              } else {
                callback(response);
              }
            });
          } else {
            database
              .findOne({ "users._id": new MDB.ObjectId(_id) })
              .then((users: any) => {
                if (users) {
                  findUserByID(_id, (response: apiResponse) => {
                    if (response.status) {
                      callback(
                        Message.positive({
                          subj: "User found",
                          payload: {
                            _id: _id,
                            location: users._id,
                            name: users.name,
                            type: "user",
                            pinned: users.pinned,
                            language: response.payload.language
                          }
                        })
                      );
                    } else {
                      callback(response);
                    }
                  });
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
    console.log('findUserByEmail');
    console.log(res);
    // console.log(res);
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
          console.log("compareResult");
          console.log(compareResult);
          if (compareResult.status) {
            const { _id, location, type, language, name, pinned } = res.payload;
            console.log(_id);
            console.log(location);
            console.log(type);
            console.log(language);
            console.log(name);
            callback(
              Message.positive({
                subj: "User authed",
                payload: { _id, location, type: "user", language, name, pinned }
              })
            );
          } else {
            callback(compareResult);
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
        console.log(muniResult);
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
                callback(compareResult);
              }
            }
          );
        } else {
          callback(muniResult);
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
          console.log('search result')
          console.log(result)
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

export const getCategories = (callback: (arg0: apiResponse) => void) => {
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
};

export const findUserByID = (
  _id: string,
  callback: (arg0: apiResponse) => void
) => {
  const database: any = MDB.client.db(dbName).collection(dbcMain);
  database
    .aggregate([
      {
        $match: {
          "users._id": new MDB.ObjectId(_id)
        }
      },
      {
        $project: {
          _id: 0,
          users: 1
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
          _id: new MDB.ObjectId(_id)
        }
      }
    ])
    .toArray((err: any, result: any) => {
      if (err) {
        // if error
        callback(
          Message.errorMessage({
            action: "get userById",
            e: err
          })
        );
      } else if (result.length === 0) {
        // if no - response
        callback(Message.notFound("users by Id"));
      } else if (result.length > 1) {
        // if too many results
        callback(Message.tooManyResultsMessage("get usersById"));
      } else {
        callback(
          Message.positive({
            subj: "User found",
            payload: result[0]
          })
        );
      }
    });
};
export const findMuniUserByID = (
  _id: string,
  callback: (arg0: apiResponse) => void
) => {
  const database: any = MDB.client.db(dbName).collection(dbcMain);
  database
    .aggregate([
      {
        $match: {
          "admins._id": new MDB.ObjectId(_id)
        }
      },
      {
        $project: {
          _id: 0,
          admins: 1
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
          _id: new MDB.ObjectId(_id)
        }
      }
    ])
    .toArray((err: any, result: any) => {
      if (err) {
        // if error
        callback(
          Message.errorMessage({
            action: "get muniUserById",
            e: err
          })
        );
      } else if (result.length === 0) {
        // if no - response
        callback(Message.notFound("muniUsers by Id"));
      } else if (result.length > 1) {
        // if too many results
        callback(Message.tooManyResultsMessage("get muniUsersById"));
      } else {
        callback(
          Message.positive({
            subj: "Muni user found",
            payload: result[0]
          })
        );
      }
    });
};
