import * as assert from "assert";

import * as MDB from "../modules/db_connect";
import * as Generate from "../modules/token_gen";
import { dropQuotes } from "../modules/check_strings";
import {
  updateMessage,
  errorMessage,
  notFound,
  requestError,
  tooManyResultsMessage,
  notAllowedToGetResultsMessage,
  alreadyExistsMessage
} from "../modules/response_message";

import {
  apiResponseTYPE,
  UserTYPE,
  NewUserTYPE,
  IncLoginTYPE,
  TokenTYPE,
  IncUserCreateTYPE
} from "../src/types";

const dbName = "muni";

// * Utilities
/**
 * Update user fields
 * @function updateUser
 * @param {string} id - User ID, found before (double check)
 * @param { object } newFields - New fields to update
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
const updateUser = (
  id: string,
  newFields: { [index: string]: string | Date | number },
  callback: (arg0: apiResponseTYPE) => void
) => {
  console.log("upd:");
  console.log(id);
  console.log(newFields);
  MDB.client.connect(err => {
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .updateOne(
        { "users._id": new MDB.ObjectID(id) },
        { $set: newFields },
        { upsert: true, multi: false }
      )
      .then((document: any) => {
        console.log(document);
        // check if result is positive
        const check =
          document.result.nModified === 1 && document.result.ok === 1;
        if (check) {
          callback({ status: true, message: "Fields updated", code: 200 });
        } else {
          callback({
            status: false,
            message: "Contact administrator (user fields update failed)",
            code: 500
          });
        }
      })
      .catch((e: any) => {
        console.log(e);
        callback({
          status: false,
          message: `Contact administrator (${e})`,
          code: 500
        });
      });
  });
};
// find user by email
const checkIfEmailNew = (email: string, callback: (arg0: boolean) => void) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
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
// * enf-of-utilities
/**
 * Create user in the system and authenticate it
 * @function create
 * @param { object } user - User object as per { name: string, email: string, pass: string }
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
export const create = (
  request: IncUserCreateTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // const token = Generate.token();
  const id = new MDB.ObjectID();
  checkIfEmailNew(request.email, (emailIsNew: boolean) => {
    if (emailIsNew) {
      const createUser: NewUserTYPE = {
        _id: id,
        fName: dropQuotes(request.fName),
        lName: dropQuotes(request.lName),
        avatar: dropQuotes(request.avatar),
        email: dropQuotes(request.email),
        pass: dropQuotes(request.pass),
        posts: [],
        settings: {}
      };

      MDB.client.connect(err => {
        assert.equal(null, err);

        const db: any = MDB.client.db(dbName);
        db.collection("dev")
          .updateOne(
            { _id: new MDB.ObjectID(request.location) },
            { $push: { users: createUser } }
          )
          .then((dbReply: any) => {
            console.log(dbReply);

            if (dbReply.result.nModified === 1 && dbReply.result.ok === 1) {
              callback({
                status: true,
                message: "User created",
                code: 200,
                payload: {
                  id: id
                }
              });
              MDB.client.close();
            } else {
              callback({
                status: false,
                message: "User not created",
                code: 500
              });
              MDB.client.close();
            }
          })
          .catch((e: any) =>
            callback(errorMessage({ action: "user create", e }))
          );
      });
    } else {
      callback(alreadyExistsMessage("Email"));
    }
  });
};
/**
 * Check token for existence and validity, zero it in DB if not valid
 * @function checkToken
 * @param { string } token - User ID
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
export const checkToken = (
  token: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);

    db.collection("dev")
      .aggregate([
        {
          $unwind: {
            path: "$users",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $match: {
            "users.token": token
          }
        },
        {
          $project: {
            "users.location": "$_id",
            "users.authDate": 1,
            "users.fName": 1,
            "users._id": 1
          }
        },
        {
          $replaceRoot: {
            newRoot: "$users"
          }
        }
      ])
      .toArray((err: any, result: any) => {
        // if error return error
        console.log("check token");
        console.log(result);
        if (err) {
          callback({
            status: false,
            message: `Contact administrator (${err.toString()})`,
            code: 500
          });
        }
        // if no token found
        else if (result.length === 0) {
          callback({
            status: false,
            message: `Unauthorized (token not found)`,
            code: 401
          });
        } else {
          // if token found
          const authDate = result[0].authDate;
          const today: any = new Date();
          const authedHours = Math.round((today - authDate) / 3600000);
          // check time validity
          if (authedHours < 210 && authedHours >= 0) {
            // if valid
            callback({
              status: true,
              message: "Authorized",
              code: 200,
              payload: {
                id: result[0]._id,
                location: result[0].location,
                name: result[0].fname
              }
            });
          } else {
            // if not
            updateUser(
              result[0]._id,
              {
                "users.$.token": "",
                "users.$.authDate": ""
              },
              (updateUserResponse: apiResponseTYPE) => {
                let response: apiResponseTYPE = {
                  status: false,
                  message: "Unauthorized (token expired)",
                  code: 401
                };
                if (authedHours < 0) {
                  response.message =
                    "Unauthorized (token expired, authDate in DB later than today)";
                }
                callback(response);
              }
            );
          }
        }
      });
  });
};
/**
 * Get user details by user ID
 * @function get
 * @param { object } props - Search ID and ID of user, requested the information
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
export const get = (
  props: { id: string; userRequested: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check if userRequested is a SU
  MDB.client.connect(err => {
    assert.equal(null, err);
    let database: any = MDB.client.db(dbName).collection("app");
    database
      .findOne({ "su._id": new MDB.ObjectID(props.userRequested) })
      .then((document: any) => {
        let userIsSuper = false;
        if (document) {
          userIsSuper = true;
        }
        let database: any = MDB.client.db(dbName).collection("dev");
        database
          .aggregate([
            {
              $match: {
                "users._id": new MDB.ObjectID(props.id)
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
                _id: new MDB.ObjectID(props.id)
              }
            }
          ])
          .toArray((e: any, result: any) => {
            if (e) {
              errorMessage({ action: "user search", e });
            } else if (result.length === 0) {
              // not found
              callback(notFound("user"));
            } else if (result.length > 1) {
              // houston, we've got problem
              callback(tooManyResultsMessage("user search"));
            } else {
              // bingo
              // allowed?
              if (userIsSuper || result[0]._id === props.userRequested) {
                // return result
                callback({
                  status: true,
                  message: `User ${result[0]._id}`,
                  code: 200,
                  payload: result[0]
                });
              } else {
                // no rights
                callback(notAllowedToGetResultsMessage("get this information"));
              }
            }
          });
      });
  });
};
/**
 * Check if user exists of new
 * @function isUserNew
 * @param { string } user - User email
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
const isUserNew = (
  user: IncLoginTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .aggregate([
        {
          $match: {
            _id: new MDB.ObjectID(user.location)
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
        let response: apiResponseTYPE = {
          status: false,
          message: "User not found (email is not registered)",
          code: 200
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
            payload: { id: result[0]._id }
          };
        }
        callback(response);
      });
  });
};

/**
 * Try login user
 * @function loginAttempt
 * @param { object } user - User in format {email: string, pass: string}
 * @param {string} id - User ID, found before (double check)
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
export const loginAttempt = (
  user: IncLoginTYPE,
  id: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  console.log(user);
  console.log(id);
  MDB.client.connect(err => {
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .aggregate([
        {
          $match: {
            _id: new MDB.ObjectID(user.location)
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
            _id: new MDB.ObjectID(id),
            email: user.email,
            pass: user.pass
          }
        },
        {
          $project: {
            fName: 1,
            lName: 1,
            email: 1,
            pass: 1
          }
        }
      ])
      .toArray((err: any, result: any) => {
        let response: apiResponseTYPE = {
          status: false,
          message: "",
          code: 500
        };
        console.log(result);
        console.log(result.length);
        if (err) {
          callback({
            status: false,
            message: `Contact administrator (${err
              .toString()
              .replace(/\\"/g, "")})`,
            code: 500
          });
        } else if (result.length === 1) {
          // match
          console.log(result.length);
          // set the fields to update
          const token = Generate.token();
          const newFields = {
            "users.$.token": token,
            "users.$.authDate": new Date()
          };
          // call updater
          updateUser(
            result[0]._id,
            newFields,
            (updateUserResponse: apiResponseTYPE) => {
              console.log(updateUserResponse);
              if (updateUserResponse.status) {
                response = {
                  status: true,
                  message: "User logged in",
                  code: 200,
                  payload: {
                    id: result[0]._id,
                    fName: result[0].fname,
                    token: token
                  }
                };
              } else {
                response = updateUserResponse;
              }
              callback(response);
            }
          );
        } else {
          if (result.length > 1) {
            // if too many results
            response.message =
              "Contact administrator (too many results, not possible at this point)";
            response.code = 500;
          } else {
            // no result
            response.message = "User not found (not matching 3 keys)";
            response.code = 203;
          }
          callback(response);
        }
      });
  });
};

/**
 * Login user
 * @function login
 * @param { object } user - User in format {email: string, pass: string}
 * @returns {} - Uses callback function to send apiResponseTYPE
 */
export const login = (
  user: IncLoginTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  suCheckLogin(user, (suCheckResponse: apiResponseTYPE) => {
    if (suCheckResponse.status || suCheckResponse.code === 401) {
      callback(suCheckResponse);
    } else {
      isUserNew(user, (newUserResponse: apiResponseTYPE) => {
        // if 1 only user found, attempt to login
        if (newUserResponse.status) {
          loginAttempt(
            user,
            newUserResponse.payload.id,
            (loginAttemptResponse: apiResponseTYPE) => {
              callback(loginAttemptResponse);
            }
          );
        } else {
          callback(newUserResponse);
        }
      });
    }
  });
};
export const suCheckToken = (
  token: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  MDB.client.connect(err => {
    // assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("app")
      .aggregate([
        {
          $match: {
            "su.token": token
          }
        }
      ])
      .toArray((err: any, result: any) => {
        let response: apiResponseTYPE = {
          status: false,
          message: "Please, re-login and repeat",
          code: 203
        };
        if (result.length > 0) {
          // if token found
          const id = result[0]._id;
          const authDate = result[0].su.authDate;
          const today: any = new Date();
          const authedHours = Math.round((today - authDate) / 3600000);
          // check time validity
          if (authedHours < 720 && authedHours >= 0) {
            // if valid
            const expireDate = new Date(today.setDate(today.getDate() + 30));
            callback({
              status: true,
              message: "Authorized",
              code: 200,
              payload: {
                id: result[0]._id,
                expire: expireDate
              },
              level: "su"
            });
          } else {
            // if not valid
            db.collection("app")
              .updateOne(
                { _id: new MDB.ObjectID(id) },
                { $set: { "su.token": "", "su.authDate": "" } }
              )
              .then((document: any) => {
                // default response
                response.message = "Error in expired SU token reset";
                response.code = 500;

                // if OK
                if (
                  document.result.nModified === 1 &&
                  document.result.ok === 1
                ) {
                  response = {
                    status: true,
                    message: "SU token expired and was reset",
                    code: 401
                  };
                }
                callback(response);
              })
              .catch((e: any) => console.log(e));
          }
        } else {
          // if not
          callback(response);
        }
      });
  });
};

export const suCheckLogin = (
  user: IncLoginTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  MDB.client.connect(err => {
    const db: any = MDB.client.db(dbName);
    // check if user exists
    db.collection("app")
      .aggregate([
        {
          $match: {
            "su.email": user.email
          }
        }
      ])
      .toArray((err: any, result: any) => {
        console.log(result);
        // if no - response
        if (result.length === 0) {
          callback({
            status: false,
            message: "SU not found",
            code: 203
          });
        } else {
          // try to login if yes
          db.collection("app")
            .aggregate([
              {
                $match: {
                  "su.email": user.email,
                  "su.pass": user.pass
                }
              }
            ])
            .toArray((err: any, result: any) => {
              let response: apiResponseTYPE = {
                status: false,
                message: "SU: wrong password",
                code: 401
              };
              if (result.length > 0) {
                const token = Generate.token();
                const newFields = {
                  "su.token": token,
                  "su.authDate": new Date()
                };
                db.collection("app")
                  .updateOne(
                    {
                      _id: new MDB.ObjectID(result[0]._id)
                    },
                    { $set: newFields },
                    { upsert: true }
                  )
                  .then((document: any) => {
                    response.message = "Error in SU login";
                    response.code = 500;

                    if (
                      document.result.nModified === 1 &&
                      document.result.ok === 1
                    ) {
                      const today: any = new Date();
                      const expireDate = new Date(
                        today.setDate(today.getDate() + 30)
                      );
                      response = {
                        status: true,
                        message: "SU login is OK",
                        code: 200,
                        payload: {
                          id: result[0].su._id,
                          expire: expireDate
                        }
                      };
                    }
                    callback(response);
                  })
                  .catch((e: any) => console.log(e));
              } else {
                callback(response);
              }
            });
        }
      });
  });
};
