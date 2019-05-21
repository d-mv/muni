import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

import { apiResponseTYPE } from "../src/types";

const dotEnv = dotenv.config();
const passPhrase: any = process.env.SECRET;

export const hashedString = async (text: string) => {
  return await bcrypt.hash(text, 10);
};
export const phrase = process.env.SECRET;

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
