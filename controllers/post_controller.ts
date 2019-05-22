import * as Post from "../models/post_model";

import { checkToken } from "../modules/check_token";
import { checkID } from "../modules/check_strings";

import { apiResponseTYPE, IncPostsListTYPE } from "../src/types";

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
  // check token
  // checkToken(props.token, (r: apiResponseTYPE) => {
  //   // if token is bad
  //   if (!r.status) {
  //     callback(r);
  //   } else {
  //     // authorized
  //     let access = false;
  //     //  if level is super-user or location requested === location of user
  //     if (
  //       (r.level && r.level === "su") ||
  //       r.payload.location == props.query.location
  //     ) {
  //       access = true;
  //     }
  //     //  if access granted
  //     if (access) {
        // const query = {
        //   location: props.query.location,
        //   options: {
        //     byUser: !r.level || r.level !== "su",
        //     userId: r.payload.id
        //   }
        // };
  Post.list(props, (modelResponse: apiResponseTYPE) => {
          console.log('object')
          callback(modelResponse);
        });
      }
      //  if access not granted
      // else {
      //   callback({
      //     status: false,
      //     message: "Location is not authorized",
      //     code: 401
      //   });
  //     }
  //   }
  // });
// };


/** Update existing post
 *@function update
 * @param  {id:string;query:{[index:string]:string};token:string} props - Post id, query with fields and token
 * @return {} - Returns response through callback function
 */
export const update = (
  props: {
    id: string;
    query: { [index: string]: string };
    token: string;
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check malformed ID
  const idCheckResult = checkID(props.id);
  if (!idCheckResult.status) {
    callback(idCheckResult);
  } else {
    // check token
    checkToken(props.token, (r: apiResponseTYPE) => {
      // if token is bad
      if (!r.status) {
        callback(r);
      } else {
        // request User model
        const query = {
          id: props.id,
          user: r.payload.id,
          level: r.level || "",
          fields: { ...props.query }
        };
        Post.update(query, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      }
    });
  }
};
/** Update existing post
 *@function update
 * @param  {id:string;query:{[index:string]:string};token:string} props - Post id, query with fields and token
 * @return {} - Returns response through callback function
 */
export const create = (
  props: {
    id: string;
    query: { [index: string]: string };
    token: string;
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check malformed ID
  const idCheckResult = checkID(props.id);
  if (!idCheckResult.status) {
    callback(idCheckResult);
  } else {
    // check token
    checkToken(props.token, (r: apiResponseTYPE) => {
      // if token is bad
      if (!r.status) {
        callback(r);
      } else {
        // request User model
        const query = {
          id: props.id,
          user: r.payload.id,
          level: r.level || "",
          fields: { ...props.query }
        };
        Post.update(query, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      }
    });
  }
};
/** Update existing post
 *@function update
 * @param  {id:string;query:{[index:string]:string};token:string} props - Post id, query with fields and token
 * @return {} - Returns response through callback function
 */
export const deletePost = (
  props: {
    post: string;
    token: string;
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check malformed ID
  const idCheckResult = checkID(props.post);
  if (!idCheckResult.status) {
    callback(idCheckResult);
  } else {
    // check token
    checkToken(props.token, (r: apiResponseTYPE) => {
      // if token is bad
      if (!r.status) {
        callback(r);
      } else {
        // request User model
        const query = {
          post: props.post,
          user: r.payload.id,
          level: r.level || ""
        };
        Post.deletePost(query, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      }
    });
  }
};

