import * as Post from "../models/post_model";

// import { checkToken } from "../modules/check_token";
import { checkToken } from "../modules/security";
import { checkID } from "../modules/check_strings";
import checkPostFields from "../modules/check_post";
import { apiResponseTYPE, IncPostsListTYPE } from "../src/types";

import { requestError } from "../modules/response_message";

/**
 * Function to create post
 * @function createPost
 * @param {object} props - Incoming feed from router
 * @callback callback - Callback function to return response
 */
export const createPost = (
  props: any,
  callback: (arg0: apiResponseTYPE) => void
) => {
  if (Object.keys(props.body).length === 0) {
    // if request body is empty
    callback(requestError("Wrong/malformed request"));
  } else if (!props.body.location) {
    callback(requestError("Wrong/malformed request"));
  } else if (!checkPostFields(props.body.post)) {
    // if fields are missing, empty or wrong type
    callback(requestError("Wrong/malformed request"));
  } else {
    if (!props.headers.token) {
      // if token is not present send code/message
      callback(requestError("Token is missing"));
    } else {
      // token is present, check it
      checkToken(props.headers.token, (checkTokenResponse: apiResponseTYPE) => {
        // check if code is not positive
        if (checkTokenResponse.code !== 200) {
          // negative code
          callback(checkTokenResponse);
        } else {
          // positive code = 200
          Post.create(
            {
              post: props.body.post,
              location: props.body.location,
              user: checkTokenResponse.payload.id
            },
            (modelResponse: apiResponseTYPE) => {
              // callback with response
              callback(modelResponse);
            }
          );
        }
      });
    }
  }
};

/**
 * Function to update post
 * @function updatePost
 * @param {object} props - Incoming feed from router
 * @callback callback - Callback function to return response
 */
export const updatePost = (
  props: any,
  callback: (arg0: apiResponseTYPE) => void
) => {
    if (Object.keys(props.body).length === 0) {
      // if request body is empty
      callback(requestError("Wrong/malformed request"));
    } else {
      if (!props.headers.token) {
        // if token is not present send code/message
        callback(requestError("Token is missing"));
      } else {
        // token is present, check it
        checkToken(
          props.headers.token,
          (checkTokenResponse: apiResponseTYPE) => {
            // check if code is not positive
            if (checkTokenResponse.code !== 200) {
              // negative code
              callback(checkTokenResponse);
            } else {
              // positive code = 200
              Post.update(
                {
                  fields: props.body.post,
                  postId: props.params.id,
                  user: checkTokenResponse
                },
                (modelResponse: apiResponseTYPE) => {
                  // callback with response
                  callback(modelResponse);
                }
              );
            }
          }
        );
      }
    }
};
/**
 * Function to delete post
 * @function deletePost
 * @param {object} props - Incoming feed from router
 * @callback callback - Callback function to return response
 */
export const deletePost = (
  props: any,
  callback: (arg0: apiResponseTYPE) => void
) => {
      if (!props.headers.token) {
        // if token is not present send code/message
        callback(requestError("Token is missing"));
      } else {
        // token is present, check it
        checkToken(
          props.headers.token,
          (checkTokenResponse: apiResponseTYPE) => {
            // check if code is not positive
            if (checkTokenResponse.code !== 200) {
              // negative code
              callback(checkTokenResponse);
            } else {
              // positive code = 200
              Post.deletePost(
                {
                  postId: props.params.id,
                  user: checkTokenResponse
                },
                (modelResponse: apiResponseTYPE) => {
                  // callback with response
                  callback(modelResponse);
                }
              );
            }
          }
        );

    }
};

/** Get the list of locations
 * @function posts
 * @param  {object} props - Request in the form of IncPostsListTYPE
 * @return {} - Uses callback to return standard apiResponseTYPE
 */
export const posts = (
  props: IncPostsListTYPE,
  callback: (arg0: apiResponseTYPE) => void
) => {
  Post.list(props, (modelResponse: apiResponseTYPE) => {
    console.log("object");
    callback(modelResponse);
  });
};

// /** Update existing post
//  *@function update
//  * @param  {id:string;query:{[index:string]:string};token:string} props - Post id, query with fields and token
//  * @return {} - Returns response through callback function
//  */
// export const update = (
//   props: {
//     id: string;
//     query: { [index: string]: string };
//     token: string;
//   },
//   callback: (arg0: apiResponseTYPE) => void
// ) => {
//   // check malformed ID
//   const idCheckResult = checkID(props.id);
//   if (!idCheckResult.status) {
//     callback(idCheckResult);
//   } else {
//     // check token
//     checkToken(props.token, (r: apiResponseTYPE) => {
//       // if token is bad
//       if (!r.status) {
//         callback(r);
//       } else {
//         // request User model
//         const query = {
//           id: props.id,
//           user: r.payload.id,
//           level: r.level || "",
//           fields: { ...props.query }
//         };
//         // Post.update(query, (modelResponse: apiResponseTYPE) => {
//         //   callback(modelResponse);
//         // });
//       }
//     });
//   }
// };

/** Update existing post
 *@function update
 * @param  {id:string;query:{[index:string]:string};token:string} props - Post id, query with fields and token
 * @return {} - Returns response through callback function
 */
// export const create = (
//   props: {
//     id: string;
//     query: { [index: string]: string };
//     token: string;
//   },
//   callback: (arg0: apiResponseTYPE) => void
// ) => {
//   // check malformed ID
//   const idCheckResult = checkID(props.id);
//   if (!idCheckResult.status) {
//     callback(idCheckResult);
//   } else {
//     // check token
//     checkToken(props.token, (r: apiResponseTYPE) => {
//       // if token is bad
//       if (!r.status) {
//         callback(r);
//       } else {
//         // request User model
//         const query = {
//           id: props.id,
//           user: r.payload.id,
//           level: r.level || "",
//           fields: { ...props.query }
//         };
//         Post.update(query, (modelResponse: apiResponseTYPE) => {
//           callback(modelResponse);
//         });
//       }
//     });
//   }
// };
// /** Update existing post
//  *@function update
//  * @param  {id:string;query:{[index:string]:string};token:string} props - Post id, query with fields and token
//  * @return {} - Returns response through callback function
//  */
// export const deletePost = (
//   props: {
//     post: string;
//     token: string;
//   },
//   callback: (arg0: apiResponseTYPE) => void
// ) => {
//   // check malformed ID
//   const idCheckResult = checkID(props.post);
//   if (!idCheckResult.status) {
//     callback(idCheckResult);
//   } else {
//     // check token
//     checkToken(props.token, (r: apiResponseTYPE) => {
//       // if token is bad
//       if (!r.status) {
//         callback(r);
//       } else {
//         // request User model
//         const query = {
//           post: props.post,
//           user: r.payload.id,
//           level: r.level || ""
//         };
//         Post.deletePost(query, (modelResponse: apiResponseTYPE) => {
//           callback(modelResponse);
//         });
//       }
//     });
//   }
// };
