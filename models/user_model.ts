import * as assert from "assert";
import * as dotenv from "dotenv";

import * as MDB from "../modules/db_connect";
import { dropQuotes } from "../modules/check_strings";
import { compareStringToHash, encodeString } from "../modules/security";

import * as Message from "../modules/response_message";
import * as TYPE from "../src/types";

// constant variables
const dotEnv = dotenv.config();
// db
const dbName = process.env.MONGO_DB || "muni";
// collections
const dbcApp = process.env.MONGO_COL_APP || "app";
const dbcMain = process.env.MONGO_COL_MAIN || "dev";

/**
 * Update user fields
 * @function updateUser
 * @param {string} id - User ID, found before (double check)
 * @param { object } newFields - New fields to update
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
const updateUser = (
  id: string,
  newFields: { [index: string]: string | Date | number },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database: any = MDB.client.db(dbName).collection(dbcMain);
    database
      .updateOne(
        { "users._id": new MDB.ObjectId(id) },
        { $set: newFields },
        { upsert: true, multi: false }
      )
      .then((document: any) => {
        // check if result is positive adn callback result
        callback(
          Message.updateMessage({
            subj: "User",
            document: {
              ok: document.result.ok,
              nModified: document.result.nModified
            }
          })
        );
      })
      .catch((e: any) => {
        assert.equal(null, e);
        callback(Message.errorMessage({ action: "user update", e }));
      });
  });
};

// find user by email
const checkIfEmailNew = (email: string, callback: (arg0: boolean) => void) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection(dbcMain)
      .aggregate([
        {
          $match: {
            "users.email": email
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
      .toArray((e: any, res: any) => {
        if (e || res.length > 0) {
          callback(false);
        } else {
          callback(true);
        }
      });
  });
};

/**
 * Get user details by user ID
 * @function get
 * @param { object } props - Search ID and ID of user, requested the information
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
export const get = (
  props: { id: string; userRequested: string },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  console.log(props);
  // check if userRequested is a SU
  isUserSuper(props.userRequested, (isSuper: boolean) => {
    // get requested user
    MDB.client.connect(err => {
      assert.equal(null, err);
      if (err) {
        callback(Message.errorMessage({ action: "connection to DB", e: err }));
      } else {
        let database: any = MDB.client.db(dbName).collection(dbcMain);
        database
          .aggregate([
            {
              $match: {
                "users._id": new MDB.ObjectId(props.id)
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
                _id: new MDB.ObjectId(props.id)
              }
            }
          ])
          .toArray((e: any, result: any) => {
            if (e) {
              callback(Message.errorMessage({ action: "user search", e }));
            } else if (result.length === 0) {
              // not found
              callback(Message.notFound("user"));
            } else if (result.length > 1) {
              // houston, we've got problem
              callback(Message.tooManyResultsMessage("user search"));
            } else {
              // bingo
              // allowed?
              if (isSuper || result[0]._id == props.userRequested) {
                // return result
                callback({
                  status: true,
                  message: `User ${result[0]._id}, found ${
                    result[0].posts.length
                  } post(s)`,
                  code: 200,
                  payload: result[0].posts
                });
              } else {
                // no rights
                callback(
                  Message.notAllowedToGetResultsMessage("get this information")
                );
              }
            }
          });
      }
    });
  });
};
/**
 * Check if user exists of new
 * @function isUserNew
 * @param { string } user - User email
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
const isUserNew = (
  user: TYPE.IncLoginTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection(dbcMain)
      .aggregate([
        {
          $match: {
            "users.email": user.email
          }
        },
        {
          $addFields: {
            "users.location": "$_id"
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
            email: user.email
          }
        }
      ])
      .toArray((err: any, result: any) => {
        // no result
        console.log("isUserNew?");
        console.log(result);
        let response: TYPE.apiResponse = {
          status: false,
          message: "User not found (email is not registered)",
          code: 404
        };
        if (result.length > 1) {
          // if too many results
          response.message = "Contact administrator (too many results)";
          response.code = 500;
        } else if (result.length === 1) {
          // match

          response = {
            status: true,
            message: "User found",
            code: 200,
            payload: result[0]
          };
        }
        callback(response);
      });
  });
};
// ** done
/**
 * Check if user is a super
 * @function isUserSuper
 * @param {string} userId - ID of interest
 * @return {boolean} - Answer if user is a super one
 */
export const isUserSuper = (
  userId: string,
  callback: (arg0: boolean) => void
) => {
  MDB.client.connect(async (err: Error) => {
    const database: any = MDB.client.db(dbName).collection(dbcApp);
    database
      .findOne({
        "su._id": new MDB.ObjectId(userId)
      })
      .then((document: any) => {
        let isSuper = false;
        if (document) {
          isSuper = true;
        }
        callback(isSuper);
      });
  });
  // return isSU
};

/**
 * Create user in the system and authenticate it
 * @function create
 * @param { object } user - User object as per { name: string, email: string, pass: string }
 * @callback createCallback - Function to return result (TYPE.apiResponse)
 */
export const create = (
  request: TYPE.IncUserCreateTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // const token = Generate.token();
  const id = new MDB.ObjectId();
  checkIfEmailNew(request.email, (emailIsNew: boolean) => {
    if (emailIsNew) {
      encodeString(
        dropQuotes(request.pass),
        (encoded: TYPE.apiResponse | TYPE.intApiResponseTYPE) => {
          if (!encoded.status) {
            // if error - callback error
            //  @ts-ignore - in this case it's always TYPE.apiResponse
            callback(encoded);
          } else {
            // if created - proceed with creating
            // set a user variable
            const createUser: TYPE.NewUserTYPE = {
              _id: id,
              fName: dropQuotes(request.fName),
              lName: dropQuotes(request.lName),
              avatar: dropQuotes(request.avatar),
              email: dropQuotes(request.email),
              pass: encoded.payload,
              posts: [],
              settings: {}
            };
            // store it database
            MDB.client.connect(err => {
              assert.equal(null, err);
              if (err) {
                callback(
                  Message.errorMessage({ action: "connection to DB", e: err })
                );
              } else {
                const database: any = MDB.client.db(dbName).collection(dbcMain);
                database
                  .updateOne(
                    { _id: new MDB.ObjectId(request.location) },
                    { $push: { users: createUser } }
                  )
                  .then((dbReply: any) => {
                    // if OK
                    if (
                      dbReply.result.nModified === 1 &&
                      dbReply.result.ok === 1
                    ) {
                      callback({
                        status: true,
                        message: "User created",
                        code: 200,
                        payload: {
                          id: id
                        }
                      });
                    } else {
                      // if not OK
                      callback({
                        status: false,
                        message: "User not created",
                        code: 500
                      });
                    }
                  })
                  .catch((e: any) => {
                    assert.equal(null, e);
                    callback(Message.errorMessage({ action: "user create", e }))
                  }
                  );
              }
            });
          }
        }
      );
    } else {
      // if already exists
      callback(Message.alreadyExistsMessage("Email"));
    }
  });
};
/**
 * Login user
 * @function login
 * @param { object } user - User in format {email: string, pass: string}
 * @callback loginCallback - Function to return result (TYPE.apiResponse)
 */
export const login = (
  user: TYPE.IncLoginTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // try login as SU
  suLoginAttempt(user, (suCheckResponse: TYPE.apiResponse) => {
    // callback if logged in or wrong password
    if (suCheckResponse.status || suCheckResponse.code === 401) {
      callback(suCheckResponse);
    } else {
      // check if user exists
      isUserNew(user, (newUserResponse: TYPE.apiResponse) => {
        // if 1 only user found, attempt to login
        console.log("newUserResponse");
        console.log(newUserResponse);
        if (newUserResponse.status) {
          // check login data
          // if found > check password
          compareStringToHash(
            user.pass,
            newUserResponse.payload.pass,
            (response: boolean | TYPE.apiResponse) => {
              if (typeof response === "boolean") {
                // if it's true/false
                if (response) {
                  // if matching
                  callback(
                    Message.positiveMessage({
                      subj: "User login is OK",
                      payload: {
                        payload: {
                          id: newUserResponse.payload._id,
                          location: newUserResponse.payload.location
                        }
                      }
                    })
                  );
                } else {
                  // if not matching
                  callback(
                    Message.generalError({
                      subj: "User: wrong password",
                      code: 401
                    })
                  );
                }
              } else {
                // if it's error
                callback(response);
              }
            }
          );
        } else {
          // callback with result
          callback(newUserResponse);
        }
      });
    }
  });
};

/**
 * Login set of credentials
 * @typedef {Object} IncLoginTYPE
 * @property {string} email - Email
 * @property {string} pass - Password
 * @property {string} [location] -Location - optional for super-user
 */
/**
 * Attempt to login as super-user
 * @function suLoginAttempt
 * @param { IncLoginTYPE } user - Attempt to login with {@link IncLoginType}
 * @callback suLoginAttemptCallback - Function to return result (TYPE.apiResponse)
 */
export const suLoginAttempt = (
  user: TYPE.IncLoginTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  console.log('inside syLoginAttempt')
  // connect to DB
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcApp);
      // check if user exists
      database
        .aggregate([
          {
            $match: {
              "su.email": user.email
            }
          }
        ])
        .toArray((err: any, result: any) => {
          if (err) {
            // if error
            callback(Message.errorMessage({ action: "SU match", e: err }));
          } else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("SU not found"));
          } else {
            // try to login if yes
            compareStringToHash(
              user.pass,
              result[0].su.pass,
              (response: boolean | TYPE.apiResponse) => {
                // console.log(hash)
                // console.log(result[0].su.pass);
                if (typeof response === "boolean") {
                  // if it's true/false
                  if (response) {
                    // if matching
                    callback(
                      Message.positiveMessage({
                        subj: "SU login is OK",
                        payload: {
                          level: "su",
                          payload: {
                            id: result[0].su._id
                          }
                        }
                      })
                    );
                  } else {
                    // if not matching
                    callback(
                      Message.generalError({
                        subj: "SU: wrong password",
                        code: 401
                      })
                    );
                  }
                } else {
                  // if it's error
                  callback(response);
                }
              }
            );
          }
        });
    }
  });
};
/**
 * Login set of credentials
 * @typedef {Object} IncLoginTYPE
 * @property {string} email - Email
 * @property {string} pass - Password
 * @property {string} [location] -Location - optional for super-user
 */
/**
 * Attempt to login as super-user
 * @function suLoginAttempt
 * @param { IncLoginTYPE } user - Attempt to login with {@link IncLoginType}
 * @param {string} id - Location ID
 * @callback loginAttemptCallback - Function to return result (TYPE.apiResponse)
 */
export const loginAttempt = (
  user: TYPE.IncLoginTYPE,
  id: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      console.log(user);
      database
        .aggregate([
          {
            $match: {
              _id: new MDB.ObjectId(user.location)
            }
          },
          {
            $addFields: {
              "users.location": "$_id"
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
              _id: new MDB.ObjectId(id),
              email: user.email
            }
          },
          {
            $project: {
              fName: 1,
              lName: 1,
              avatar: 1,
              email: 1,
              pass: 1,
              location: 1
            }
          }
        ])
        .toArray((err: any, result: any) => {
          if (err) {
            // if error
            callback(Message.errorMessage({ action: "user match", e: err }));
          } else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("user not found"));
          } else if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("user matching"));
          } else {
            // if found > check password
            compareStringToHash(
              user.pass,
              result[0].pass,
              (response: boolean | TYPE.apiResponse) => {
                if (typeof response === "boolean") {
                  // if it's true/false
                  if (response) {
                    // if matching
                    callback(
                      Message.positiveMessage({
                        subj: "User login is OK",
                        payload: {
                          payload: {
                            id: result[0]._id,
                            location: result[0].location
                          }
                        }
                      })
                    );
                  } else {
                    // if not matching
                    callback(
                      Message.generalError({
                        subj: "User: wrong password",
                        code: 401
                      })
                    );
                  }
                } else {
                  // if it's error
                  callback(response);
                }
              }
            );
          }
        });
    }
  });
};
