import * as Location from "../models/location_model";
import * as Post from "../models/post_model";
import { checkToken } from "../modules/check_token";

import { apiResponseTYPE, IncPostsListTYPE } from "../src/types";
/** Get the list of locations
 * @function list
 * @param  {object} props - Request in the form of {query:{[index:string]:string};token:string}
 * @return {} - Uses callback to return standard apiResponseTYPE
 */
export const list = (
  props: { query: { [index: string]: string }; token: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  checkToken(props.token, (r: apiResponseTYPE) => {
    if (!r.status) {
      callback(r);
    } else {
      // request User model
      Location.list((modelResponse: apiResponseTYPE) => {
        callback(modelResponse);
      });
    }
  });
};
/** Get the list of locations
 * @function posts
 * @param  {object} props - Request in the form of IncPostsListTYPE
 * @return {} - Uses callback to return standard apiResponseTYPE
 */
//  props format:
// const props = {
//   query: {
//     location: "",
// options: {
//     byUser: true,
//     userId: ""}
//   },
//   token: ""
// };
export const posts = (
  props: IncPostsListTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  // chekc token
  checkToken(props.token, (r: apiResponseTYPE) => {
    if (!r.status) {
      callback(r);
    } else {
      // check if token.location === requested location
      console.log(r.payload.location);
      console.log(props.query.location);
      if (r.payload.location == props.query.location) {
        //  request Post model
        Post.list(props.query, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      } else {
        callback({
          status: false,
          message: "Location is not authorized",
          code: 401
        });
      }
    }
  });
};
