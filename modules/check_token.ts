import * as User from "../models/user_model";

import { apiResponseTYPE, TokenTYPE } from "../src/types";

import {
  dropQuotes,
  checkTokenLength,
  checkID
} from "../modules/check_strings";

/** Check if token is valid
 * @param  {string} token
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
export const checkToken = (
  token: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check fields
  if (dropQuotes(token) === "") {
    callback({
      status: false,
      message: "Unauthorized (no token)",
      code: 401
    });
  } else {
    // check if token malformed
    const checkLength = checkTokenLength(token);
    if (!checkLength.status) {
      callback(checkLength);
    } else {
      // check location malformed
      //  const checkIdResult = checkID(props.location);
      //  const check =
      //    dropQuotes(props.location) !== "" && checkIdResult.status;
      //  if (!check) {
      //    callback(checkIdResult);
      //  } else {
      // check with DB
      User.checkToken(token, (modelResponse: apiResponseTYPE) => {
        callback(modelResponse);
      });
      //  }
    }
  }
};
