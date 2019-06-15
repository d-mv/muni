import * as assert from "assert";
import * as dotenv from "dotenv";

import * as User from "./user_model";

import * as MDB from "../modules/db_connect";
import findPostById from "./find_post_by_id";
import findPostByTitle from "./find_post_by_title";
import * as Message from "../modules/response_message";
import * as TYPE from "../src/types";

// constant variables
const dotEnv = dotenv.config();
// db
const dbName = process.env.MONGO_DB || "muni";
// collections
const dbcMain = process.env.MONGO_COL_MAIN || "dev";

/**
 * Function to return list of posts
 * @function list
 * @param {object} query - Contains location
 * @callback callback - Callback function to return response
 */
export const list = (
  query: any,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      callback(Message.errorMessage({ action: "connection to DB", e: err }));
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
          if (e) {
            // if error
            callback(
              Message.errorMessage({ action: "posts (by location) search", e })
            );
          } else if (result.length === 0) {
            // not found
            callback(Message.notFound("posts"));
          } else {
            // bingo

            // return result
            callback(
              Message.positiveMessage({
                subj: `Found ${result.length} post(s)`,
                payload: result
              })
            );
          }
        });
    }
  });
};

export const checkByTitle = (
  location: string,
  title: string,
  callback: (arg0: boolean) => void
) => {
  const database: any = MDB.client.db(dbName).collection(dbcMain);
  database
    .aggregate([
      {
        $match: {
          _id: new MDB.ObjectId(location),
          "users.posts.title": title
        }
      }
    ])
    .toArray((e: any, res: any) => {
      if (e || res.length === 0) {
        callback(false);
      } else {
        callback(true);
      }
    });
};

/**
 * Function to create post
 *
 * @param {object} request - New post fields and user ID
 * @callback callback - Callback function to return response
 *
 */
export const create = (
  request: TYPE.newPostRequest,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  checkByTitle(
    request.location,
    request.post.title,
    (checkResponse: boolean) => {
      if (checkResponse) {
        callback(Message.alreadyExistsMessage("post title"));
      } else {
        const database: any = MDB.client.db(dbName).collection(dbcMain);
        // set document to insert
        const newDocument = {
          _id: new MDB.ObjectId(),
          createdBy: new MDB.ObjectId(request.user),
          date: new Date(),
          status: "active",
          votes: [],
          reply: {
            text: "",
            date: new Date(),
            up: [],
            down: []
          },
          ...request.post
        };
        database
          .update(
            {
              _id: new MDB.ObjectId(request.location),
              "users._id": new MDB.ObjectId(request.user)
            },
            { $push: { "users.$.posts": newDocument } }
          )
          .then((document: any) => {
            // process response
            callback(
              Message.updateMessage({
                subj: "Post",
                document: {
                  ok: document.result.ok,
                  nModified: document.result.nModified
                }
              })
            );
          })
          .catch((e: any) => {
            assert.equal(null, e);
            callback(Message.errorMessage({ action: "post create", e }));
          });
      }
    }
  );
};

/**
 * Function to update post
 * @function update
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
export const update = (
  request: {
    fields: { [index: string]: string };
    postId: string;
    user: any;
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
  console.log(request);

  const setRequest: any = {};
  // prepare the request
  Object.keys(request.fields).forEach((key: string) => {
    setRequest[`users.$[].posts.$[reply].${key}`] = request.fields[key];
  });
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({ action: "connection to DB (5)", e: err })
      );
    } else {
      // set database
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // update
      console.log(setRequest);
      database
        .updateMany(
          { "users.posts._id": new MDB.ObjectId(request.postId) },
          { $set: { ...setRequest } },
          {
            arrayFilters: [{ "reply._id": new MDB.ObjectId(request.postId) }]
          }
        )
        .then((document: any) => {
          // process response
          callback(
            Message.updateMessage({
              subj: "Post",
              document: {
                ok: document.result.ok,
                nModified: document.result.nModified
              }
            })
          );
        })
        .catch((e: any) => {
          assert.equal(null, e);
          callback(Message.errorMessage({ action: "post update", e }));
        });
    }
  });
  // } else {
  //   callback(
  //     Message.notAuthMessage(
  //       "You need to be either owner or administrator to edit this post"
  //     )
  //   );
  // }
};
// );
// };
/**
 * Function to delete post
 * @function deletePost
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
export const deletePost = (
  request: {
    postId: string;
    user: any;
  },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // check if post title is available
  findPostById(request.postId, (findPostResult: TYPE.apiResponse) => {
    // if status true inform, that user exists
    // if status false, proceed with creation
    if (findPostResult.code !== 200) {
      // send message
      callback(findPostResult);
    } else if (
      // checking authorization
      request.user.level === "su" ||
      findPostResult.payload.createdBy == request.user.payload.id
    ) {
      // authenticated
      MDB.client.connect(err => {
        assert.equal(null, err);
        if (err) {
          // return error with connection
          callback(
            Message.errorMessage({ action: "connection to DB (5)", e: err })
          );
        } else {
          // set database
          const database: any = MDB.client.db(dbName).collection(dbcMain);
          // update
          database
            .update(
              { "users.posts._id": new MDB.ObjectId(request.postId) },
              {
                $pull: {
                  "users.$[].posts": { _id: new MDB.ObjectId(request.postId) }
                }
              }
            )
            .then((document: any) => {
              // process response
              callback(
                Message.updateMessage({
                  subj: "Post",
                  document: {
                    ok: document.result.ok,
                    nModified: document.result.nModified
                  }
                })
              );
            })
            .catch((e: any) => {
              assert.equal(null, e);
              callback(Message.errorMessage({ action: "post update", e }));
            });
        }
      });
    } else {
      callback(
        Message.notAuthMessage(
          "You need to be either owner or administrator to edit this post"
        )
      );
    }
  });
};

export const vote = (
  request: {
    id: string;
    user: string;
  },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  const { id, user } = request;

  console.log("id");
  console.log("user");

  console.log(id);
  console.log(user);

  findPostById(id, (findPostResult: TYPE.apiResponse) => {
    if (findPostResult.status) {
      const voters = findPostResult.payload.votes;
      const inlcudes = voters.includes(user);
      if (inlcudes) {
        // already voted
        callback(Message.generalError({ subj: "Already voted", code: 401 }));
      } else {
        // not yet voted
        MDB.client.connect(err => {
          assert.equal(null, err);
          if (err) {
            // return error with connection
            callback(
              Message.errorMessage({
                action: "connection to DB (5)",
                e: err
              })
            );
          } else {
            const database: any = MDB.client.db(dbName).collection(dbcMain);
            // const index = `users.$[].posts.$[reply].${id}`;
            // setRequest[`users.$[].posts.$[reply].${key}`] = request.fields[key];
            let dBrequest: TYPE.data = {};
            // dBrequest[index] = user;
            dBrequest[`users.$[].posts.$[reply].votes.$[]`] = user;
            // update
            database
              .updateMany(
                { "users.posts._id": new MDB.ObjectId(id) },
                { $push: { "users.$.posts.$[reply].votes": user } },
                // { $set: { ...dBrequest } },
                {
                  arrayFilters: [{ "reply._id": new MDB.ObjectId(id) }]
                }
              )
              .then((document: any) => {
                // process response
                callback(
                  Message.updateMessage({
                    subj: "Post",
                    document: {
                      ok: document.result.ok,
                      nModified: document.result.nModified
                    }
                  })
                );
              })
              .catch((e: any) => {
                assert.equal(null, e);
                callback(Message.errorMessage({ action: "post update", e }));
              });
          }
        });
      }
    } else {
      callback(findPostResult);
    }
  });
};
