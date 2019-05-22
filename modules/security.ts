import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

import { errorMessage } from "./response_message";
import { apiResponseTYPE, intApiResponseTYPE } from "../src/types";

const dotEnv = dotenv.config();
const passPhrase: any = process.env.SECRET;

/**
 * Encode a string
 * @function encodeString
 * @param  {string} text - A string of text to encode
 * @callback encodeStringCallback - Function to return result or error message (apiResponseTYPE | intApiResponseTYPE)
 */
export const encodeString = (
  text: string,
  callback: (arg0: apiResponseTYPE | intApiResponseTYPE) => void
) => {
  // generate salt
  bcrypt.genSalt(10, (saltErr: Error, salt: string) => {
    if (saltErr) {
      // if error
      callback(errorMessage({ action: "salt generation", e: saltErr }));
    } else {
      // generate hash
      bcrypt.hash(text, salt, (hashErr: Error, hash: string) => {
        // if error
        if (hashErr) {
          callback(errorMessage({ action: "hash generation", e: hashErr }));
        } else {
          callback({ status: true, payload: hash });
        }
      });
    }
  });
};
/**
 * Compare a string with encoded string
 * @function compareStringToHash
 * @param  {string} text - A string of text to compare
 * @param  {string} hash - A hash of text to compare
 * @callback compareStringToHashCallback - Function to return result or error message (apiResponseTYPE | boolean)
 */
export const compareStringToHash = (
  text: string,
  hash: string,
  callback: (arg0: boolean | apiResponseTYPE) => void
) => {
  bcrypt.compare(text, hash, (err: Error, res: boolean) => {
    if (err) {
      callback(errorMessage({ action: "hash compare", e: err }));
    } else {
      callback(res);
    }
  });
};
export const checkToken = (
  token: string,
  callback: (arg0?: any, arg?: any) => void
) => {
  jwt.verify(token, passPhrase, (err: any, decoded: any) => {
    let response = {
      status: false,
      message: "SU token expired and was reset",
      code: 401
    };
    if (err) {
      response.message = `Error in reading token: ${err}`;
      callback(response);
    } else {
      const now: any = new Date();
      const expiry: any = new Date(decoded.exp * 1000);
      const authedHours = Math.round((expiry - now) / 3600000);
      // check time validity
      if (authedHours <= 720 && authedHours >= 0) {
        // good
        response.status = true;
        response.message = "Token is valid";
        response.code = 200;
      } else if (authedHours > 720) {
        // unauth
        response.message = "Token expired";
      } else {
        // smth wrong
        response.message =
          "The diffrence between 'issued' and 'expired' is wrong";
        response.code = 500;
      }
      callback(response, decoded.id ? decoded.id : null);
    }
  });
};

export const cookieFactory = (message: apiResponseTYPE) => {
  const code = message.code;
  let token = "";
  let expire = "";
  let options = {
    expire,
    httpOnly: false,
    secure: false
  };
  if (message.status) {
    const id = message.payload.id;
    const now = new Date(Date.now() + 2592000 * 1000);
    expire = now.toUTCString();
    delete message.payload;
    delete message.code;
    token = jwt.sign({ id }, passPhrase, {
      expiresIn: 2592000 // expires in 30 days in seconds
    });
    options = {
      expire,
      httpOnly: true,
      secure: true
    };
  }
  return { token, options, code, message };
};
