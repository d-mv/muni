import * as assert from "assert";

import * as MDB from "../modules/db_connect";
import * as Generate from "../modules/token_gen";
import { dropQuotes } from "../modules/check_strings";
import {
  updateMessage,
  errorMessage,
  notFound,
  requestError
} from "../modules/response_message";
import { apiResponseTYPE, IncPostsListToModelTYPE } from "../src/types";
import { Db } from "mongodb";

export const list = (query: any, callback: (arg0: apiResponseTYPE) => void) => {
  console.log("post model");
  console.log(query);
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db("muni").collection("dev");
    // request for user's posts
    const request: any = [
      {
        $match: {
          _id: new MDB.ObjectID(query.location)
        }
      },
      {
        $unwind: {
          path: "$users",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          "users._id": new MDB.ObjectID(query.options.userId)
        }
      },
      {
        $project: {
          _id: 0,
          list: "$users.posts"
        }
      }
    ];
    // request for all posts
    const requestSu: any = [
      {
        $match: {
          _id: new MDB.ObjectID(query.location)
        }
      },
      {
        $unwind: {
          path: "$users",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          list: "$users.posts"
        }
      }
    ];
    // if it's a user - his posts, if SU - all posts
    const ask = query.options.byUser ? request : requestSu;
    database.aggregate(ask).toArray((err: any, result: any) => {
      // if 0
      let response: apiResponseTYPE = {
        status: false,
        message: "No posts in the DB",
        code: 203
      };
      // if err
      if (err) {
        response.message = `Error getting list of posts: ${err}`;
        response.code = 500;
        // if many
      } else if (result.length > 0) {
        // process result
        const payload: any = [];
        result.forEach((block: any) => {
          block.list.forEach((set: any) => {
            payload.push(set);
          });
        });
        response = {
          status: true,
          message: "Posts found",
          code: 200,
          payload: payload
        };
      }
      callback(response);
    });
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
    const database = MDB.client.db("muni").collection("dev");
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
            "posts._id": new MDB.ObjectID(props.id)
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
                { arrayFilters: [{ "reply._id": new MDB.ObjectID(props.id) }] }
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
    const database = MDB.client.db("muni").collection("dev");
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
            "posts._id": new MDB.ObjectID(props.post)
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
                { "users.posts._id": new MDB.ObjectID(props.post) },
                {
                  $pull: {
                    "users.$[].posts": { _id: new MDB.ObjectID(props.post) }
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
