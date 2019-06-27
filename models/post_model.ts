import * as assert from "assert";
import * as dotenv from "dotenv";

import * as User from "./user_model";

import * as MDB from "../modules/db_connect";
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
            $project: {
              posts: "$users.posts"
            }
          },
          {
            $project: {
              allPosts: {
                $reduce: {
                  input: "$posts",
                  initialValue: [],
                  in: {
                    $concatArrays: ["$$value", "$$this"]
                  }
                }
              }
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
                payload: result[0].allPosts
              })
            );
          }
        });
    }
  });
};
export const listMuni = (
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
              path: "$municipality",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $replaceRoot: {
              newRoot: "$municipality"
            }
          }
        ])
        .toArray((e: any, result: any) => {
          if (e) {
            // if error
            callback(
              Message.errorMessage({
                action: "municipality posts (by location) search",
                e
              })
            );
          } else if (result.length === 0) {
            // not found
            callback(Message.notFound("municipality posts"));
          } else {
            // bingo

            // return result
            callback(
              Message.positiveMessage({
                subj: `Found ${result.length} municipality post(s)`,
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
 * @param {object} request - New post fields and user ID
 * @callback callback - Callback function to return response
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
export const createMuni = (
  request: any,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  const newPost = {
    ...request.post,
    _id: new MDB.ObjectId(),
    date: new Date(),
    status: "active"
  };
  const database: any = MDB.client.db(dbName).collection(dbcMain);
  database
    .update(
      {
        _id: new MDB.ObjectId(request.location)
      },
      { $push: { municipality: newPost } }
    )
    .then((document: any) => {
      // process response
      if (request.post.pinned) {
        database
          .update(
            {
              _id: new MDB.ObjectId(request.location)
            },
            { pinned: newPost }
          )
          .then((pinned: any) => {
            callback(
              Message.updateMessage({
                subj: "Pinned post",
                document: {
                  ok: document.result.ok,
                  nModified: document.result.nModified
                }
              })
            );
          })
          .catch((e: any) => {
            assert.equal(null, e);
            callback(Message.errorMessage({ action: "pinned post create", e }));
          });
      } else {
        callback(
          Message.updateMessage({
            subj: "Post",
            document: {
              ok: document.result.ok,
              nModified: document.result.nModified
            }
          })
        );
      }
    })
    .catch((e: any) => {
      assert.equal(null, e);
      callback(Message.errorMessage({ action: "pinned post create", e }));
    });
};

/**
 * Function to update post
 * @function update
 * @param {object} request - New post fields,location ID and user ID
 * @callback callback - Callback function to return response
 */
export const update = (
  request: TYPE.indexedObj,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // extract id from post object
  const id = request._id;
  const post: TYPE.indexedObj = request;
  delete post._id;

  const setRequest: any = {};
  // prepare the request
  Object.keys(post).forEach((key: string) => {
    setRequest[`users.$[].posts.$[reply].${key}`] = post[key];
  });
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({ action: "connection to DB (7)", e: err })
      );
    } else {
      // set database
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // update
      console.log(setRequest);
      database
        .updateMany(
          { "users.posts._id": new MDB.ObjectId(id) },
          { $set: { ...setRequest } },
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
};
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
  // findPostById(request.postId, (findPostResult: TYPE.apiResponse) => {
  //   // if status true inform, that user exists
  //   // if status false, proceed with creation
  //   if (findPostResult.code !== 200) {
  //     // send message
  //     callback(findPostResult);
  //   } else if (
  //     // checking authorization
  //     request.user.level === "su" ||
  //     findPostResult.payload.createdBy == request.user.payload.id
  //   ) {
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
};
//     } else {
//       callback(
//         Message.notAuthMessage(
//           "You need to be either owner or administrator to edit this post"
//         )
//       );
//     }
//   });
// };

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

  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({
          action: "connection to DB (6)",
          e: err
        })
      );
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // let dBrequest: TYPE.data = {};
      // dBrequest[`users.$[].posts.$[reply].votes.$[]`] = user;
      // update
      database
        .update(
          { "users.posts._id": new MDB.ObjectId(id) },
          {
            $addToSet: {
              "users.$.posts.$[reply].votes": new MDB.ObjectId(user)
            }
          },
          {
            arrayFilters: [{ "reply._id": new MDB.ObjectId(id) }]
          }
        )
        .then((document: any) => {
          // process response
          console.log(document);
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
};

export interface replyVoteModel {
  post: string;
  user: string;
  vote: string;
}
export const replyVote = (
  request: replyVoteModel,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  console.log("requets to update reply votes:");
  console.log(request);
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({
          action: "connection to DB (8)",
          e: err
        })
      );
    } else {
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // if true - vote up
      const subj = request.vote
        ? { "users.$.posts.$[reply].reply.up": new MDB.ObjectId(request.user) }
        : {
            "users.$.posts.$[reply].reply.down": new MDB.ObjectId(request.user)
          };
      database
        .update(
          { "users.posts._id": new MDB.ObjectId(request.post) },
          {
            $addToSet: subj
          },
          {
            arrayFilters: [{ "reply._id": new MDB.ObjectId(request.post) }]
          }
        )
        .then((document: any) => {
          // process response
          console.log(document);
          callback(
            Message.updateMessage({
              subj: "Post reply vote",
              document: {
                ok: document.result.ok,
                nModified: document.result.nModified
              }
            })
          );
        })
        .catch((e: any) => {
          assert.equal(null, e);
          callback(
            Message.errorMessage({ action: "post reply voteupdate", e })
          );
        });
    }
  });
};

export const updateMuni = (
  request: TYPE.data,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  console.log("updateMuni");
  console.log(Object.keys(request.post));
  console.log(request.post.text);

  const location = request.location;
  const post: TYPE.indexedObj = request.post;
  const id = post._id;
  delete post._id;

  let setRequest: any = [];
  Object.keys(post).forEach((key: string) => {
    setRequest[`municipality.$[reply].${key}`] = post[key];
  });

  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({ action: "connection to DB (P1)", e: err })
      );
    } else {
      // set database
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      database
        .updateMany(
          { _id: new MDB.ObjectId(location) },
          { $set: { "municipality.$[reply]": post } },
          {
            arrayFilters: [{ "reply._id": new MDB.ObjectId(id) }]
          }
        )
        .then((document: any) => {
          // process response
          console.log(document);
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
};
export const deleteMuniPost = (
  request: {
    postId: string;
    location: string;
  },
  callback: (arg0: TYPE.apiResponse) => void
) => {
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
          { _id: new MDB.ObjectId(request.location) },
          {
            $pull: { municipality: { _id: new MDB.ObjectId(request.postId) } }
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
};
