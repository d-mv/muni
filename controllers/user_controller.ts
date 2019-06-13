import { verifyId, cookieFactory } from "./../modules/security";
import { apiResponse } from "./../src/types";
import { apiState } from "./../client/src/store/defaults";
import * as User from "../models/user_model";
import * as Message from "../modules/response_message";
import sendMail from "../modules/send_mail";

import * as TYPE from "../src/types";
import { checkFieldsLogin } from "../modules/check_strings";

/**
 * @param  {IncUserCreateTYPE} props
 * @param  {(arg0:TYPE.apiResponse)=>void} callback
 */
export const create = (
  query: TYPE.IncUserCreateTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // assign value to avoid 'or empty' clause
  const request: any = query;
  // request User model
  User.create(request, (modelResponse: TYPE.apiResponse) => {
    if (modelResponse.status) {
      console.log(modelResponse);
      // send confirmation email
      const encrypt: any = cookieFactory(modelResponse, true);
      console.log(encrypt);
      const url = `https://muni-dev.herokuapp.com/api/user/verify?id=${encrypt.token}`;
      sendMail(request.email, url, request.lang);
      callback({
        ...modelResponse,
        payload: { cookie: encrypt }
      });
    } else {
      callback(modelResponse);
    }
  });
};

export const verify = (id: string, callback: (arg0: apiResponse) => void) => {
  verifyId(id, (verifyResponse: TYPE.apiResponse) => {
    if (verifyResponse.status) {
      const { _id } = verifyResponse.payload;
      console.log(_id);
      User.confirmedEmail(_id, (modelResponse: TYPE.apiResponse) => {
        // if (modelResponse.status) {
        // }
        callback(modelResponse);
      });
    } else {
      callback(verifyResponse);
    }
  });
};

/**
 * @param  {IncUserIdTYPE} props
 * @param  {(arg0:TYPE.apiResponse)=>void} callback
 */
export const get = (
  props: { id: string; userRequested: string },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  User.get(props, (modelResponse: TYPE.apiResponse) => {
    callback(modelResponse);
  });
};

/** Login function
 * @param  {object} props - Query and token
 * @return {} - Returns data with callback function
 */
export const login = (
  props: { query: { [index: string]: string } },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // check fields
  const reply: TYPE.apiResponse = checkFieldsLogin({ query: props.query });
  const user: any = props.query;
  console.log("calling user login");
  // request User model
  User.login(user, (modelResponse: TYPE.apiResponse) => {
    callback(modelResponse);
  });
  // }
};
