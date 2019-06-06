import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

import * as User from "../models/user_model";
import * as Message from "./response_message";
import * as TYPE from "../src/types";

const dotEnv = dotenv.config();
const passPhrase: any = process.env.SECRET;

/**
 * Encode a string
 * @function encodeString
 * @param  {string} text - A string of text to encode
 * @callback - Function to return result or error message (apiResponseTYPE | intApiResponseTYPE)
 */
export const encodeString = (
  text: string,
  callback: (arg0: TYPE.apiResponse | TYPE.intApiResponseTYPE) => void
) => {
  // generate salt
  bcrypt.genSalt(10, (saltErr: Error, salt: string) => {
    if (saltErr) {
      // if error
      callback(Message.errorMessage({ action: "salt generation", e: saltErr }));
    } else {
      // generate hash
      bcrypt.hash(text, salt, (hashErr: Error, hash: string) => {
        // if error
        if (hashErr) {
          callback(
            Message.errorMessage({
              action: "hash generation",
              e: hashErr
            })
          );
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
 * @callback - Function to return result or error message (apiResponse | boolean)
 */
export const compareStringToHash = (
  text: string,
  hash: string,
  callback: (arg0: boolean | TYPE.apiResponse) => void
) => {
  bcrypt.compare(text, hash, (err: Error, res: boolean) => {
    if (err) {
      callback(Message.errorMessage({ action: "hash compare", e: err }));
    } else {
      callback(res);
    }
  });
};

/**
 * Function to decipher the token and check it for validity, expiry and if owner is SU
 *@function checkToken
 * @param {string} token
 * @callback - Callback function to return the message w/payload or not
 */
export const checkToken = (
  token: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  jwt.verify(token, passPhrase, (err: any, decoded: any) => {
    if (err) {
      callback(Message.errorMessage({ action: "reading token", e: err }));
    } else {
      const now: any = new Date();
      const expiry: any = new Date(decoded.exp * 1000);
      const authedHours = Math.round((expiry - now) / 3600000);
      // check time validity
      if (authedHours <= 720 && authedHours >= 0) {
        // good
        let response: TYPE.apiResponse = {
          status: true,
          message: "Token is valid",
          code: 200
        };
        User.isUserSuper(decoded.id, (modelResponse: boolean) => {
          response.level = modelResponse ? "su" : "";
          if (!modelResponse) {
            // user is not super
            User.getLocationInfo(decoded.id, (modelReply: TYPE.apiResponse) => {
              callback({ ...response, payload: { ...modelReply } });
            })
          } else {
          callback({ ...response, payload: { id: decoded.id } })};
        });
      } else if (authedHours > 720) {
        // unauth
        callback(Message.notAuthMessage("token expired"));
      } else {
        // smth wrong
        callback(
          Message.wrongDbMessage(
            "The difference between 'issued' and 'expired' is wrong"
          )
        );
      }
    }
  });
};

/**
 * Function to create encoded cookies
 * @function cookieFactory
 * @param {object} message - User details
 * @return {object} - Returns object with token, cookie options, result code & message from input
 */
export const cookieFactory = (message: TYPE.apiResponse) => {
  const code = message.code;
  let token = "";
  let expire = "";
  let options = {
    expire,
    httpOnly: false,
    secure: false
  };
  if (message.status) {
    const id = message.payload._id;
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
