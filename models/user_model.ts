import * as assert from "assert";
import * as dotenv from "dotenv";

import * as MDB from "../modules/db_connect";
import { dropQuotes } from "../modules/check_strings";
import { compareStringToHash, encodeString } from "../modules/security";

import * as Message from "../modules/response_message";
import * as TYPE from "../src/types";
import { indexedObj } from "../src/types";

// constant variables
const dotEnv = dotenv.config();
// db
const dbName = process.env.MONGO_DB || "muni";
// collections
const dbcApp = process.env.MONGO_COL_APP || "app";
const dbcMain = process.env.MONGO_COL_MAIN || "dev";
const dbAppId = process.env.MONGO_APP_ID || "5ce03ad1bb94e55d2ebf2161";

// find user by id
export const getUserById = (
  id: string,
  callback: (arg0: TYPE.apiResponse) => void
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
              "users._id": new MDB.ObjectId(id)
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
              _id: new MDB.ObjectId(id)
            }
          }
        ])
        .toArray((e: any, res: any) => {
          if (e) {
            callback(Message.notFound("user"));
          } else {
            console.log(res.size);
            callback(
              Message.foundMessage("user", { language: res[0].language })
            );
          }
        });
    }
  });
};

/**
 * Update user fields
 * @function updateUser
 * @param {string} id - User ID, found before (double check)
 * @param { object } newFields - New fields to update
 * @returns {} - Uses callback function to send TYPE.apiResponse
 */
export const updateUser = (
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
const checkIfEmailNew = (
  email: string,
  callback: (arg0: boolean) => void,
  app?: boolean
) => {
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

export const verifyUser = (
  _id: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      let database: any = MDB.client.db(dbName).collection(dbcMain);
      database
        .aggregate([
          {
            $unwind: {
              path: "$newUsers",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $replaceRoot: {
              newRoot: "$newUsers"
            }
          },
          {
            $match: {
              _id: new MDB.ObjectId(_id)
            }
          }
        ])
        .toArray((e: any, result: any) => {
          if (e) {
            callback(Message.errorMessage({ action: "temp user search", e }));
          } else if (result.length === 0) {
            // not found
            callback(Message.notFound("user"));
          } else if (result.length > 1) {
            // houston, we've got problem
            callback(Message.tooManyResultsMessage("temp user search"));
          } else {
            // bingo
            const newUser = {
              fName: result[0].fName,
              lName: result[0].lName,
              email: result[0].email,
              pass: result[0].pass,
              posts: [],
              settings: result[0].settings
            };

            database = MDB.client.db(dbName).collection(dbcMain);
            database
              .updateOne(
                { _id: new MDB.ObjectId(result[0].location) },
                { $push: { users: newUser } }
              )
              .then((dbReply: any) => {
                // if OK
                if (dbReply.result.nModified === 1 && dbReply.result.ok === 1) {
                  callback({
                    status: true,
                    message: "User created",
                    code: 200,
                    payload: {
                      id: _id
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
                callback(Message.errorMessage({ action: "user create", e }));
              });
          }
        });
    }
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
                  message: `User ${result[0]._id}, found ${result[0].posts.length} post(s)`,
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
export const isUserNew = (
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
 * @returns {TYPE.apiResponse}
 */
export const create = (
  request: TYPE.IncUserCreateTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // const token = Generate.token();
  const id = new MDB.ObjectId();
  checkIfEmailNew(
    request.email,
    (emailIsNew: boolean) => {
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
                location: new MDB.ObjectId(request.location),
                fName: dropQuotes(request.fName),
                lName: dropQuotes(request.lName),
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
                  const database: any = MDB.client
                    .db(dbName)
                    .collection(dbcApp);
                  database
                    .updateOne(
                      { _id: new MDB.ObjectId(dbAppId) },
                      { $push: { newUsers: createUser } }
                    )
                    .then((dbReply: any) => {
                      // if OK
                      if (
                        dbReply.result.nModified === 1 &&
                        dbReply.result.ok === 1
                      ) {
                        //                       console.log("object")
                        // console.log(id)
                        callback({
                          status: true,
                          message: "Temp user created",
                          code: 200,
                          payload: {
                            _id: id
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
                      callback(
                        Message.errorMessage({ action: "user create", e })
                      );
                    });
                }
              });
            }
          }
        );
      } else {
        // if already exists
        callback(Message.alreadyExistsMessage("Email"));
      }
    },
    true
  );
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
                  const lang = newUserResponse.payload.language;
                  getLocationInfo(
                    newUserResponse.payload._id,
                    (dataResponse: TYPE.apiResponse) => {
                      // console.log("dataResponse");
                      // console.log(Object.keys(dataResponse));
                      const replyPayload = { ...dataResponse.payload, lang };
                      callback({ ...dataResponse, payload: replyPayload });
                    }
                  );
                } else {
                  // if not matching
                  callback(
                    Message.generalError({
                      subj: "Wrong password",
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
  console.log("inside syLoginAttempt");
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
              "users.location": "$_id",
              "users.localPosts": "$users.posts"
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
              location: 1,
              localPosts: 1,
              pinned: 1
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
                    // getLocationInfo()
                    callback(
                      Message.positiveMessage({
                        subj: "User login is OK",
                        payload: {
                          payload: {
                            id: result[0]._id,
                            location: result[0].location,
                            posts: result[0].localPosts
                          }
                        }
                      })
                    );
                  } else {
                    // if not matching
                    callback(
                      Message.generalError({
                        subj: "Wrong password",
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

export const getLocationInfo = (
  user: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      let database: any = MDB.client.db(dbName).collection(dbcApp);
      let categories: Array<string>;
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
              Message.errorMessage({ action: "get categories", e: err })
            );
          } else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("categories not found"));
          } else if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("get categories"));
          } else {
            categories = result[0].categories;
          }
        });
      database = MDB.client.db(dbName).collection(dbcMain);
      database
        .aggregate([
          {
            $match: {
              "users._id": new MDB.ObjectId(user)
            }
          },
          {
            $project: {
              name: 1,
              location: "$_id",
              pinned: 1,
              municipality: 1,
              _id: 0,
              posts: {
                $reduce: {
                  input: "$users.posts",
                  initialValue: [],
                  in: {
                    $concatArrays: ["$$value", "$$this"]
                  }
                }
              }
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
            // if found

            callback(
              Message.positiveMessage({
                subj: "User login is OK",
                payload: {
                  payload: { _id: user, categories, ...result[0] }
                }
              })
            );
          }
        });
    }
  });
};

export const confirmedEmail = (
  _id: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
    } else {
      let database: any = MDB.client.db(dbName).collection(dbcApp);
      database
        .aggregate([
          {
            $unwind: {
              path: "$newUsers",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $replaceRoot: {
              newRoot: "$newUsers"
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
            callback(Message.errorMessage({ action: "user match", e: err }));
          } else if (result.length === 0) {
            // if no - response
            callback(Message.notFound("user not found"));
          } else if (result.length > 1) {
            // if too many results
            callback(Message.tooManyResultsMessage("user matching"));
          } else {
            // if found
            const user = result[0];
            const { location } = user;
            delete user.location;
            database
              .update(
                { _id: new MDB.ObjectId(dbAppId) },
                { $pull: { newUsers: { _id: new MDB.ObjectId(_id) } } }
              )
              .then((document: any) => {
                // process response
                database = MDB.client.db(dbName).collection(dbcMain);
                database
                  .updateOne(
                    {
                      _id: new MDB.ObjectId(location)
                    },
                    { $push: { users: user } }
                  )
                  .then((documentCreate: any) => {
                    // check if result is positive adn callback result
                    callback(
                      Message.updateMessage({
                        subj: "User confirmed",
                        document: {
                          ok: documentCreate.result.ok,
                          nModified: documentCreate.result.nModified
                        }
                      })
                    );
                  })
                  .catch((e: any) => {
                    assert.equal(null, e);
                    callback(
                      Message.errorMessage({
                        action: "user confirmation (creation in Main)",
                        e
                      })
                    );
                  });
              })
              .catch((e: any) => {
                assert.equal(null, e);
                callback(
                  Message.errorMessage({ action: "temp user removal", e })
                );
              });
          }
        });
    }
  });
};

export const update = (
  request: {
    id: string;
    query: indexedObj;
  },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // check if post title is available
  // findPostById(request.postId, (findPostResult: TYPE.apiResponse) => {
  // if status true inform, that user exists
  // if status false, proceed with creation

  // if (findPostResult.code !== 200) {
  // send message
  // callback(findPostResult);
  // } else if (
  // checking authorization
  //   request.user.level === "su" ||
  //   findPostResult.payload.createdBy == request.user.payload.id
  // ) {
  // authenticated
  const setRequest: any = {};
  const fields: any = request.query;
  // prepare the request
  Object.keys(fields).forEach((key: string) => {
    setRequest[`users.$[reply].${key}`] = fields[key];
    // .match(/\w/g).join('');
  });
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({ action: "connection to DB (u1)", e: err })
      );
    } else {
      // set database
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // update
      database
        .updateMany(
          { "users._id": new MDB.ObjectId(request.id) },
          { $set: { ...setRequest } },
          {
            arrayFilters: [{ "reply._id": new MDB.ObjectId(request.id) }]
          }
        )
        .then((document: any) => {
          // process response
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
    }
  });
};
