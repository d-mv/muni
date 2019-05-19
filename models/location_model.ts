import assert from "assert";

import * as MDB from "../modules/db_connect";
import * as Generate from "../modules/token_gen";
import { dropQuotes } from "../modules/check_strings";
import {
  apiResponseTYPE,
  UserTYPE,
  NewUserTYPE,
  IncLoginTYPE
} from "../src/types";

const dbName = "muni";

export const list = (callback: (arg0: apiResponseTYPE) => void) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .aggregate([
        {
          $project: {
            name: "$lang.en"
          }
        }
      ])
      .toArray((err: any, result: any) => {
        let response: apiResponseTYPE = {
          status: false,
          message: "No locations in the DB"
          ,code: 203
        };
        if (err) {
          response.message = `Error: ${err}`;
          response.code = 500
        } else if (result.length > 0) {
          response = {
            status: true,
            message: "Locations found",
            code: 200,
            payload: result
          };
        }
        callback(response);
      });
  });
};
