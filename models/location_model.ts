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

export const update = (
  props: { location: string; fields: { [index: string]: string } },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check is location available
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db("muni").collection("dev");
    database
      .aggregate([{ $match: { _id: new MDB.ObjectID(props.location) } }])
      .toArray((err: any, result: any) => {
        // if not
        let response: apiResponseTYPE = {
          status: false,
          message: "No location found",
          code: 203
        };
        if (err) {
          response.message = `Error: ${err}`;
          response.code = 500;
          callback(response);
        } else if (result.length === 0) {
          callback(response);
        } else {
          database
            .updateOne(
              { _id: new MDB.ObjectID(result[0]._id) },
              { $set: { ...props.fields } }
            )
            .then((document: any) => {
              // default response
              response.message = "Error in updating the DB";
              response.code = 500;
              console.log(document);
              // if OK
              if (document.result.ok === 1) {
                // set response
                response = {
                  status: true,
                  message: "Location has been updated",
                  code: 200
                };
                // if not updated
                if (document.result.nModified === 0) {
                  response.message =
                    "Location data is the same, no modifications done";
                }
                callback(response);
              } else {
                // if not
                callback(response);
              }
            })
            .catch((e: any) =>
              callback({
                status: false,
                message: `Contact administrator (${e.toString()})`,
                code: 500
              })
            );
        }
      });
  });
};
export const deleteLocation = (
  location: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check is location available
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db("muni").collection("dev");
    database
      .aggregate([{ $match: { _id: new MDB.ObjectID(location) } }])
      .toArray((err: any, result: any) => {
        // if not
        let response: apiResponseTYPE = {
          status: false,
          message: "No location found",
          code: 203
        };
        if (err) {
          response.message = `Error: ${err}`;
          response.code = 500;
          callback(response);
        } else if (result.length === 0) {
          callback(response);
        } else {
          database
            .deleteOne({ _id: new MDB.ObjectID(result[0]._id) })
            .then((document: any) => {
              // default response
              response.message = "Error in updating the DB";
              response.code = 500;
              console.log(document);
              // if OK
              if (document.result.ok === 1) {
                // set response
                response = {
                  status: true,
                  message: "Location has been deleted",
                  code: 200
                };
                callback(response);
              } else {
                // if not
                callback(response);
              }
            })
            .catch((e: any) =>
              callback({
                status: false,
                message: `Contact administrator (${e.toString()})`,
                code: 500
              })
            );
        }
      });
  });
};
