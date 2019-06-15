import * as assert from "assert";
import * as dotenv from "dotenv";
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
 * Function to find posts by ID, to verify existing posts
 * @function findPostById
 * @param {string} id - Post ID
 * @callback callback - Callback function to return response
 */
const findPostById = (
  id: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // check if post title is available
  MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(
        Message.errorMessage({ action: "connection to DB (4)", e: err })
      );
    } else {
      // set database

      // console.log("id")
      // console.log(id)

      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // check the names availability
      database
        .aggregate([
          {
            $match: {
              "users.posts._id": new MDB.ObjectId(id)
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
            $replaceRoot: {
              newRoot: "$posts"
            }
          },
          {
            $match: {
              _id: new MDB.ObjectId(id)
            }
          }
        ])
        .toArray((e: any, documents: any) => {
          if (e) {
            callback(Message.errorMessage({ action: "post search by ID", e }));
          } else if (documents.length > 1) {
            // houston, we've got problem
            callback(Message.tooManyResultsMessage("post search by ID "));
          } else if (documents.length === 1) {
            // already exists
            callback(Message.foundMessage("Post", { payload: documents[0] }));
          } else {
            // no result
            callback(Message.notFound("post"));
          }
        });
    }
  });
};

export default findPostById;
