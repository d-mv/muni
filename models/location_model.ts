import * as assert from "assert";
import * as dotenv from "dotenv";

import * as MDB from "../modules/db_connect";

import {
  errorMessage,
  generalError,
  notFound,
  positiveMessage,
  tooManyResultsMessage,
  alreadyExistsMessage,
  updateMessage
} from "../modules/response_message";
import {
  apiResponseTYPE,
  IncNewLocationTYPE,
  LocationTYPE
} from "../src/types";

// constant variables
const dotEnv = dotenv.config();
// db
const dbName = process.env.MONGO_DB || "muni";
// collections
const dbcApp = process.env.MONGO_COL_APP || "app";
const dbcMain = process.env.MONGO_COL_MAIN || 'dev';

/**
 * Function to list all locations (without users/posts). Need for login.
 * @function list
 * @callback callback - Callback function to return the response
 */
export const list = (callback: (arg0: apiResponseTYPE) => void) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database: any = MDB.client.db(dbName).collection(dbcMain);
    database
      .aggregate([
        {
          $project: {
            lang: 1,
            photo: 1
          }
        }
      ])
      .toArray((e: any, result: any) => {
        if (e) {
          callback(errorMessage({ action: "locations fetch", e }));
        } else if (result.length > 0) {
          console.log(result);
          callback(
            positiveMessage({
              subj: "Locations found",
              code: 200,
              payload: result
            })
          );
        } else {
          callback(notFound("locations"));
        }
      });
  });
};

/**
 * Function to create a location
 * @function create
 * @param {object} query - A set of fields for the new location
 * @callback callback - Callback function to return the response
 */
export const create = (
  query: IncNewLocationTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database: any = MDB.client.db(dbName).collection(dbcMain);
    // check the names availability
    const search = { name: query.name };
    database.find(search).toArray((e: any, documents: any) => {
      console.log(documents);
      if (e) {
        callback(errorMessage({ action: "location (similar) search", e }));
      } else if (documents.length > 1) {
        // houston, we've got problem
        callback(tooManyResultsMessage("location (similar) search"));
      } else if (documents.length === 1) {
        // already exists
        callback(alreadyExistsMessage("Location"));
      } else {
        // no result

        // set the object for creation
        const createLocation: LocationTYPE = {
          _id: new MDB.ObjectId(),
          ...query
        };
        database
          .insertOne({ ...createLocation })
          .then((dbReply: any) => {
            if (dbReply.insertedCount === 1) {
              callback(
                positiveMessage({
                  subj: "Location created",
                  payload: { payload: { id: dbReply.insertedId } }
                })
              );
            } else {
              callback(
                generalError({ subj: "Location was not created", code: 500 })
              );
            }
          })
          .catch((e: any) =>
            callback(errorMessage({ action: "location creation", e }))
          );
      }
    });
    //
  });
};
/**
 * Function to update a location
 * @function update
 * @param {string} location - A set of fields for the updated location
 * @param {object} fields - A set of fields for the updated location
 * @callback callback - Callback function to return the response
 */
export const update = (
  location: string,
  fields: { [index: string]: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check is location available
  MDB.client.connect(err => {
    assert.equal(null, err);
    const database = MDB.client.db("muni").collection(dbcMain);
    database
      .find({ _id: new MDB.ObjectId(location) })
      .toArray((e: any, documents: any) => {
        console.log(documents);
        if (e) {
          callback(errorMessage({ action: "location (by ID) search", e }));
        } else if (documents.length > 1) {
          // houston, we've got problem
          callback(tooManyResultsMessage("location (by ID) search"));
        } else if (documents.length === 0) {
          // does not exist
          callback(notFound("Location"));
        } else {
          database
            .updateOne({ _id: new MDB.ObjectId(location) }, { $set: fields })
            .then((document: any) => {
              // process response
              callback(
                updateMessage({
                  subj: "Location",
                  document: {
                    ok: document.result.ok,
                    nModified: document.result.nModified
                  }
                })
              );
            })
            .catch((e: any) =>
              callback(errorMessage({ action: "location update", e }))
            );
        }
      });
  });
};
/**
 * Function to delete location
 * @function deleteLocation
 * @param {string} location - ID of location
 * @callback callback - Callback function to return the response
 */
export const deleteLocation = (
  location: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check is location available
  MDB.client.connect(err => {
    if (err) {
      callback(errorMessage({ action: "connection to DB", e: err }));
    } else {
      const database = MDB.client.db("muni").collection(dbcMain);
      database
        .find({ _id: new MDB.ObjectId(location) })
        .toArray((e: any, documents: any) => {
          if (e) {
            callback(errorMessage({ action: "location (by ID) search", e }));
          } else if (documents.length > 1) {
            // houston, we've got problem
            callback(tooManyResultsMessage("location (by ID) search"));
          } else if (documents.length === 0) {
            // does not exist
            callback(notFound("Location"));
          } else {
            database
              .deleteOne({ _id: new MDB.ObjectId(location) })
              .then((document: any) => {
                console.log(document);
                // process response
                callback(
                  updateMessage({
                    subj: "Location",
                    document: {
                      ok: document.result.ok,
                      nModified: document.result.nModified
                    }
                  })
                );
              })
              .catch((e: any) =>
                callback(errorMessage({ action: "location delete", e }))
              );
          }
        });
    }
  });
};
