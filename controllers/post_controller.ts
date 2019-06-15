import * as Post from "../models/post_model";

// import { checkToken } from "../modules/check_token";
import { checkToken } from "../modules/security";
import { checkID } from "../modules/check_strings";
// import checkPostFields from "../modules/check_post";
import * as TYPE from "../src/types";
import * as Message from "../modules/response_message";

import { requestError } from "../modules/response_message";
import { apiResponse } from 'client/src/store/types';

/**
 * Function to create post. _Example of the body_:
 *
 *```
 * { "post":
 *          {
 *            "title": "Post title",
 *            "text": "Lorem ipsum dolor sit amet...",
 *            "photo": "http://...",
 *            "link": "http://...",
 *            "type": "post",
 *            "newsId": "5ce2a3c945e5451171394b35", // - this can be 000 for empty
 *            "status": true,
 *            "votes": {
 *                        "up": 0,
 *                        "down": 0
 *             }
 *           },
 *   "location": "5ce2a3c945e5451171394b35"
 * }
 * ```
 *
 * @function createPost
 * @param {object} props - Incoming feed from router
 * @returns {callback} - Callback function to return response
 *
 */
export const createPost = (
  query: any,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  checkToken(query.token, (checkTokenResponse: TYPE.apiResponse) => {
    const { _id } = checkTokenResponse.payload.payload;
    const { location } = checkTokenResponse.payload.payload;
    const check = query.user === _id && query.location === location.toString();
    // console.log(checkTokenResponse);
    // console.log(query.user === _id);
    // console.log(typeof query.location);
    // console.log(typeof location);
    // console.log(query.location === location.toString());
    // console.log(checkTokenResponse);
    if (check) {
      const request = {
        user: query.user,
        location: query.location,
        post: query.post
      };
      Post.create(request, (modelResponse: TYPE.apiResponse) => {
        callback(modelResponse);
      });
    } else {
      callback(Message.notAuthMessage("token is not verified"));
    }
  });
};

/**
 * Function to update post
 * @function updatePost
 * @param {object} props - Incoming feed from router
 * @return {callback} - Callback function to return response
 */
export const updatePost = (
  props: any,
  callback: (arg0: TYPE.apiResponse) => void
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
        (checkTokenResponse: TYPE.apiResponse) => {
          // check if code is not positive
          if (checkTokenResponse.code !== 200) {
            // negative code
            callback(checkTokenResponse);
          } else {
            // positive code = 200
            Post.update(
              {
                fields: props.body.fields,
                postId: props.params.id,
                user: checkTokenResponse.payload._id
              },
              (modelResponse: TYPE.apiResponse) => {
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
 * @return {callback} - Callback function to return response
 */
export const deletePost = (
  props: any,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  if (!props.headers.token) {
    // if token is not present send code/message
    callback(requestError("Token is missing"));
  } else {
    // token is present, check it
    checkToken(props.headers.token, (checkTokenResponse: TYPE.apiResponse) => {
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
          (modelResponse: TYPE.apiResponse) => {
            // callback with response
            callback(modelResponse);
          }
        );
      }
    });
  }
};

/** Get the list of locations
 * @function posts
 * @param  {object} props - Request in the form of IncPostsListTYPE
 * @return {callback} - Callback function to return response
 */
export const posts = (
  props: TYPE.IncPostsListTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  Post.list(props, (modelResponse: TYPE.apiResponse) => {
    console.log("object");
    callback(modelResponse);
  });
};

export const vote = (props: { id: string, user: string }, callback: (arg0: apiResponse) => void) => {
  const {id,user} = props
  if (id === '' || user === '' || user.length !== 24 || id.length !== 24) {
    callback(Message.requestError('ID/User malformed'))
  } else {
    Post.vote({ id, user }, (modelResponse: apiResponse) => {
      callback(modelResponse)
    })
  }
}