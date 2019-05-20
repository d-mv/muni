import * as assert from "assert";

import * as MDB from "../modules/db_connect";
import * as Generate from "../modules/token_gen";
import { dropQuotes } from "../modules/check_strings";
import {
  apiResponseTYPE,
  IncNewLocationTYPE,
  LocationTYPE
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
            "lang.en": 1,
            "lang.he": 1,
            photo: 1
          }
        }
      ])
      .toArray((err: any, result: any) => {
        let response: apiResponseTYPE = {
          status: false,
          message: "No locations in the DB",
          code: 203
        };
        if (err) {
          response.message = `Error: ${err}`;
          response.code = 500;
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
export const create = (
  query: IncNewLocationTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  const createLocation: LocationTYPE = {
    lang: {
      en: query.name.en,
      he: query.name.en,
      ...query.name.other
    },
    photo: query.photo
  };

  MDB.client.connect(err => {
    assert.equal(null, err);

    const db: any = MDB.client.db(dbName);
    db.collection("dev")
      .insertOne({ ...createLocation })
      .then((dbReply: any) => {
        if (dbReply.insertedCount === 1) {
          callback({
            status: true,
            message: "Location created",
            code: 200,
            payload: { id: dbReply.insertedId }
          });
        } else {
          callback({
            status: false,
            message: "Location not created",
            code: 500
          });
        }
      })
      .catch((e: any) =>
        callback({
          status: false,
          message: `Error: ${e}`,
          code: 500
        })
      );
  });
};
