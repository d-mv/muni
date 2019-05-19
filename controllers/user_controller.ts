import * as User from "../models/user_model";
import { checkToken } from "../modules/check_token";

import {
  apiResponseTYPE,
  IncUserCreateTYPE,
  IncUserIdTYPE
} from "../src/types";

import {
  checkFields,
  checkFieldsLogin,
  checkID,
} from "../modules/check_strings";

/**
 * @param  {IncUserCreateTYPE} props
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
export const create = (
  props: IncUserCreateTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check fields
  let reply: apiResponseTYPE = checkFields({ query: props.query });
  // if negative reply immediately
  if (!reply.status) {
    callback(reply);
  } else {
    // assign value to avoid 'or empty' clause
    const user: any = props.query;
    // request User model
    User.create(user, (modelResponse: apiResponseTYPE) => {
      callback(modelResponse);
    });
  }
};
/**
 * @param  {IncUserIdTYPE} props
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
export const get = (
  props: IncUserIdTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check auth
  checkToken(props.token, (r: apiResponseTYPE) => {
    if (!r.status) {
      callback(r);
    } else {
      // check if ID is malformed
      const idCheckResult = checkID(props.id);
      if (idCheckResult.status) {
        // request User model
        User.get(props.id, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      } else {
        callback(idCheckResult);
      }
    }
  });
};
/**
 * @param  {string} token
 * @param  {(arg0:apiResponseTYPE)=>void} callback
 */
export const check = (
  token: string,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check auth
  checkToken(token, (r: apiResponseTYPE) => {
    callback(r);
  });
};

// * done!!!!
/** Login function
 * @param  {object} props - Query and token
 * @return {} - Returns data with callback function
 */
export const login = (
  props: { query: { [index: string]: string }; token: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check fields
  const reply: apiResponseTYPE = checkFieldsLogin({ query: props.query });
  const idCheckResult = checkID(props.query.location);
  const check = reply.status && idCheckResult.status;
  // if negative reply immediately
  if (!check) {
    reply ? callback(idCheckResult) : callback(reply);
  } else {
    // assign value to avoid 'or empty' clause
    const user: any = props.query;
    // request User model
    User.login(user, (modelResponse: apiResponseTYPE) => {
      callback(modelResponse);
    });
  }
};
