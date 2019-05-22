import * as User from "../models/user_model";
// import { checkToken } from "../modules/check_token";

import {
  apiResponseTYPE,
  IncUserCreateTYPE,
  // IncUserIdTYPE,
  // NewUserTYPE
} from "../src/types";
import {
  // checkFields,
  checkFieldsLogin,
  checkID
} from "../modules/check_strings";

/**
 * @param  {IncUserCreateTYPE} props
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
export const create = (
  query: IncUserCreateTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // assign value to avoid 'or empty' clause
  const request: any = query;
  // request User model
  User.create(request, (modelResponse: apiResponseTYPE) => {
    callback(modelResponse);
  });
};

/**
 * @param  {IncUserIdTYPE} props
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
export const get = (
  props: { id: string; userRequested: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  User.get(props, (modelResponse: apiResponseTYPE) => {
    callback(modelResponse);
  });
};

// /**
//  * @param  {string} token
//  * @param  {(arg0:apiResponseTYPE)=>void} callback
//  */
// export const check = (
//   token: string,
//   callback: (arg0: apiResponseTYPE) => void
// ) => {
//   // check auth
//   checkToken(token, (r: apiResponseTYPE) => {
//     callback(r);
//   });
// };

/** Login function
 * @param  {object} props - Query and token
 * @return {} - Returns data with callback function
 */
export const login = (
  props: { query: { [index: string]: string }},
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check fields
  const reply: apiResponseTYPE = checkFieldsLogin({ query: props.query });
  let idCheckResult = {
    status: false,
    message: "Location is missing",
    code: 400
  };
  if (props.query.location) {
    idCheckResult = checkID(props.query.location);
  } else {
    callback(idCheckResult);
  }
  const check = reply.status && idCheckResult.status;
  // if negative reply immediately
  if (!check) {
    reply ? callback(idCheckResult) : callback(reply);
  } else {
    // assign value to avoid 'or empty' type clause
    const user: any = props.query;
    // request User model
    User.login(user, (modelResponse: apiResponseTYPE) => {
      callback(modelResponse);
    });
  }
};
