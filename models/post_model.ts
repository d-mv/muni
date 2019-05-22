import * as assert from "assert";
import * as dotenv from "dotenv";

import * as MDB from "../modules/db_connect";
import {
  errorMessage,
  generalError,
  notFound,
  positiveMessage,
  tooManyResultsMessage,
  notAllowedToGetResultsMessage,
  alreadyExistsMessage,
  updateMessage,
  requestError
} from "../modules/response_message";
import { apiResponseTYPE, IncPostsListToModelTYPE } from "../src/types";

// constant variables
const dotEnv = dotenv.config();
// db
const dbName = process.env.MONGO_DB || "muni";
// collections
const dbcApp = process.env.MONGO_COL_APP || "app";
const dbcMain = process.env.MONGO_COL_MAIN || "dev";

export const list = (query: any, callback: (arg0: apiResponseTYPE) => void) => {
  console.log("post model");
  console.log(query);

  MDB.client.connect(err => {
    if (err) {
      callback(errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database = MDB.client.db(dbName).collection(dbcMain);
      database
        .aggregate([
          {
            $match: {
              _id: new MDB.ObjectId(query.location)
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
            $unwind: {
              path: "$posts",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              _id: 0,
              posts: 1
            }
          },
          {
            $replaceRoot: {
              newRoot: "$posts"
            }
          }
        ])
        .toArray((e: any, result: any) => {
          console.log(result);
          if (e) {
            // if error
            callback(errorMessage({ action: "posts (by location) search", e }));
          } else if (result.length === 0) {
            // not found
            callback(notFound("posts"));
          } else {
            // bingo

            // return result
            callback(
              positiveMessage({
                subj: `Found ${result.length} post(s)`,
                payload: result
              })
            );
          }
        });
      //   // if 0
      //   let response: apiResponseTYPE = {
      //     status: false,
      //     message: "No posts in the DB",
      //     code: 203
      //   };
      //   // if err
      //   if (err) {
      //     response.message = `Error getting list of posts: ${err}`;
      //     response.code = 500;
      //     // if many
      //   } else if (result.length > 0) {
      //     // process result
      //     const payload: any = [];
      //     result.forEach((block: any) => {
      //       block.list.forEach((set: any) => {
      //         payload.push(set);
      //       });
      //     });
      //     response = {
      //       status: true,
      //       message: "Posts found",
      //       code: 200,
      //       payload: payload
      //     };
      //   }
      //   callback(response);
      // });
    }
  });
};

export const update = (
  props: {
    id: string;
    user: string;
    level: string;
    fields: { [index: string]: string };
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check is post is available
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db(dbName).collection(dbcMain);
    database
      .aggregate([
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
          $unwind: {
            path: "$posts",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            fName: 0,
            lName: 0,
            email: 0,
            pass: 0,
            authDate: 0,
            token: 0
          }
        },
        {
          $match: {
            "posts._id": new MDB.ObjectId(props.id)
          }
        },
        {
          $project: {
            post: "$posts"
          }
        }
      ])
      .toArray((err: any, result: any) => {
        // if there is a result
        if (result.length === 1) {
          // if the user can have access to it
          if (props.level === "su" || result[0].post.createdBy === props.user) {
            const setRequest: any = {};
            // prepare the request
            Object.keys(props.fields).forEach((key: string) => {
              setRequest[`users.$[].posts.$[reply].${key}`] = props.fields[key];
            });
            database
              .updateMany(
                {},
                { $set: { ...setRequest } },
                { arrayFilters: [{ "reply._id": new MDB.ObjectId(props.id) }] }
              )
              .then((document: any) => {
                callback(
                  updateMessage({
                    subj: "Post",
                    document: {
                      ok: document.result.ok,
                      nModified: document.result.nModified
                    }
                  })
                );
              })
              .catch((e: any) => {
                callback(errorMessage({ action: "post update", e }));
              });
          } else {
            callback(
              requestError(
                "User doesn't have enough rights to modify the post."
              )
            );
          }
        } else {
          callback(notFound("post"));
        }
      });
  });
};
export const deletePost = (
  props: {
    post: string;
    user: string;
    level: string;
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check is post is available
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db(dbName).collection(dbcMain);
    database
      .aggregate([
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
          $unwind: {
            path: "$posts",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            fName: 0,
            lName: 0,
            email: 0,
            pass: 0,
            authDate: 0,
            token: 0
          }
        },
        {
          $match: {
            "posts._id": new MDB.ObjectId(props.post)
          }
        },
        {
          $project: {
            post: "$posts"
          }
        }
      ])
      .toArray((err: any, result: any) => {
        // if there is a result
        if (result.length === 1) {
          // if the user can have access to it
          if (props.level === "su" || result[0].post.createdBy === props.user) {
            // remove item
            database
              .update(
                { "users.posts._id": new MDB.ObjectId(props.post) },
                {
                  $pull: {
                    "users.$[].posts": { _id: new MDB.ObjectId(props.post) }
                  }
                }
              )
              .then((document: any) => {
                callback(
                  updateMessage({
                    subj: "Post",
                    document: {
                      ok: document.result.ok,
                      nModified: document.result.nModified
                    }
                  })
                );
              })
              .catch((e: any) => {
                callback(errorMessage({ action: "post update", e: e }));
              });
          } else {
            callback(
              requestError(
                "User doesn't have enough rights to modify the post."
              )
            );
          }
        } else {
          callback(notFound("post"));
        }
      });
  });
};
