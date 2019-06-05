import * as User from "../models/user_model";
// import { checkToken } from "../modules/check_token";

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
    callback(modelResponse);
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
