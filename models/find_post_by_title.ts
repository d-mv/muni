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
 * Function to find posts by title, to verify existing posts
 * @function findPostByTitle
 * @param {string} location - Location ID - posts at different locations might have the same title
 * @param {string} title - Title of the post to search
 * @callback callback - Callback function to return response
 */
const findPostByTitle = (
  location: string,
  title: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // check if post title is available
    MDB.client.connect(err => {
    assert.equal(null, err);
    if (err) {
      // return error with connection
      callback(Message.errorMessage({ action: "connection to DB (3)", e: err }));
    } else {
      // set database
      const database: any = MDB.client.db(dbName).collection(dbcMain);
      // check the names availability
      database
        .aggregate([
          {
            $match: {
              _id: new MDB.ObjectId(location)
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
              title: title
            }
          }
        ])
        .toArray((e: any, documents: any) => {
          console.log(documents);
          if (e) {
            callback(
              Message.errorMessage({ action: "post search by title", e })
            );
          } else if (documents.length > 0) {
            // houston, we've got problem
            callback(Message.tooManyResultsMessage("post search by title"));
          } else if (documents.length === 1) {
            // already exists
            callback(Message.foundMessage("Post"));
          } else {
            // no result
            callback(Message.notFound("post"));
          }
        });
    }
  });
};

export default findPostByTitle