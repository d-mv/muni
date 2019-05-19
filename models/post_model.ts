import assert from "assert";

import * as MDB from "../modules/db_connect";
import * as Generate from "../modules/token_gen";
import { dropQuotes } from "../modules/check_strings";
import { apiResponseTYPE, IncPostsListToModelTYPE } from "../src/types";

export const list = (
  query: IncPostsListToModelTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db("muni").collection("dev");

    database
      .aggregate([
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
      ])
      .toArray((err: any, result: any) => {
        // if 0
        let response: apiResponseTYPE = {
          status: false,
          message: "No posts in the DB",
          code: 203
        };
        // if err
        if (err) {
          response.message = `Error: ${err}`;
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
