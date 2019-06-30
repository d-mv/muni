import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

import * as User from "../models/user_model";
import * as Message from "./response_message";
import * as TYPE from "../src/types";

const dotEnv = dotenv.config();
const passPhrase: any = process.env.SECRET;
// defaults
const expiresInValue = 2592000;

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
  callback: (arg0: TYPE.apiResponse) => void,
  nodata?: boolean
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
        // User.isUserSuper(decoded.id, (modelResponse: boolean) => {
        //   response.level = modelResponse ? "su" : "";

        //   if (!modelResponse) {
        // user is not super
        User.getUserById(decoded.id, (getUserByIdResponse: any) => {
          if (getUserByIdResponse.status) {
            if (nodata) {
              callback(
                Message.foundMessage("token OK", {
                  payload: {
                    id: decoded.id,
                    lang: getUserByIdResponse.language,
                    type: getUserByIdResponse.type
                  }
                })
              );
            } else {
              User.getLocationInfo(
                decoded.id,
                (modelReply: TYPE.apiResponse) => {
                  console.log("getUserByIdResponse");
                  // console.log(getUserByIdResponse);
                  const replyPayload = {
                    ...modelReply.payload,
                    lang: getUserByIdResponse.language,
                    type: getUserByIdResponse.type
                  };
                  callback({ ...modelReply, payload: replyPayload });
                }
              );
            }
            //   } else {
            //     callback(getUserByIdResponse);
            //   }
            // });
          } else {
            callback({ ...response, payload: { id: decoded.id } });
          }
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
export const cookieFactory = (
  message: TYPE.apiResponse,
  createId?: boolean
) => {
  console.log("message");
  // console.log(message);
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
    let now = new Date(Date.now() + 2592000 * 1000);
    if (createId) {
      now = new Date(Date.now() + 86400 * 1000);
    }
    expire = now.toUTCString();
    delete message.payload;
    delete message.code;
    const expiresInValue = createId ? 86400 : 2592000;
    token = jwt.sign({ id }, passPhrase, {
      expiresIn: expiresInValue // expires in 30 days in seconds
    });
    options = {
      expire,
      httpOnly: true,
      secure: true
    };
  }
  return { token, options, code, message };
};

/**
 * Function to decipher the id and check it for validity and expiry
 * @function verifyId
 * @param {string} id
 * @returns {Object} - Uses callback function to return the message w/payload or not
 */
export const verifyId = (
  id: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  jwt.verify(id, passPhrase, (err: any, decoded: any) => {
    if (err) {
      callback(Message.errorMessage({ action: "reading ID", e: err }));
    } else {
      const now: any = new Date();
      const expiry: any = new Date(decoded.exp * 1000);
      const authedHours = Math.round((expiry - now) / 3600000);
      // check time validity
      if (authedHours <= 24 && authedHours >= 0) {
        // good
        let response: TYPE.apiResponse = {
          status: true,
          message: "ID is valid",
          code: 200,
          payload: {
            _id: decoded.id
          }
        };
        callback(response);
      } else if (authedHours > 24) {
        // unauth
        callback(Message.notAuthMessage("id is expired"));
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

// v2 method
export const verifyToken = async (id: string) =>
  jwt.verify(id, passPhrase, (err: any, decoded: any) => {
    if (err) {
      return Message.errorMessage({ action: "reading ID", e: err });
    } else {
      const now: any = new Date();
      const expiry: any = new Date(decoded.exp * 1000);
      const authedHours = Math.round((expiry - now) / 3600000);
      // check time validity
      if (authedHours <= 720 && authedHours >= 0) {
        // good
        return Message.positive({
          subj: "ID is valid",
          code: 200,
          payload: { _id: decoded.id }
        });
      } else if (authedHours > 720) {
        // unauth
        return Message.notAuthMessage("id is expired");
      } else {
        // smth wrong
        return Message.wrongDbMessage(
          "The difference between 'issued' and 'expired' is wrong"
        );
      }
    }
  });

// v2 method
export const compareToHash = (
  text: string,
  hash: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  bcrypt.compare(text, hash, (err: Error, res: boolean) => {
    if (err) {
      callback(Message.errorMessage({ action: "hash compare", e: err }));
    } else if (res) {
      callback(Message.positive({ subj: "Deciphered:OK" }));
    } else {
      callback(Message.negative({ subj: "Wrong password" }));
    }
  });
};

// v2 method
export const createToken = (id: string) =>
  jwt.sign({ id }, passPhrase, {
    expiresIn: expiresInValue // expires in 30 days in seconds
  });
