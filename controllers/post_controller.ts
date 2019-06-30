import { replyVoteModel } from "./../models/post_model";
import * as Post from "../models/post_model";

// import { checkToken } from "../modules/check_token";
import { checkToken } from "../modules/security";
import { checkID } from "../modules/check_strings";
// import checkPostFields from "../modules/check_post";
import * as TYPE from "../src/types";
import * as Message from "../modules/response_message";

import { requestError } from "../modules/response_message";
// import { apiResponse } from 'client/src/store/types';

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
  // console.log(Object.keys(query));
  checkToken(query.token, (checkTokenResponse: TYPE.apiResponse) => {
    // console.log(Object.keys(checkTokenResponse.payload));
    const { _id } = checkTokenResponse.payload;
    const { location } = checkTokenResponse.payload;
    const check = query.user === _id && query.location === location.toString();
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
export const createMuni = (
  query: any,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  // console.log(Object.keys(query));
  checkToken(
    query.token,
    (checkTokenResponse: TYPE.apiResponse) => {
      // console.log(Object.keys(checkTokenResponse.payload));
      const request = {
        location: query.location,
        post: query.post
      };
      Post.createMuni(request, (modelResponse: TYPE.apiResponse) => {
        callback(modelResponse);
      });
    },
    true
  );
};

/**
 * Function to update post
 * @function updatePost
 * @param {object} props - Incoming feed from router
 * @return {callback} - Callback function to return response
 */
export const updatePost = (
  request: { token: string; post: any },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  const { token, post } = request;
  // const postObject = JSON.parse(post);
  checkToken(
    token,
    (checkTokenResponse: TYPE.apiResponse) => {
      if (checkTokenResponse.code !== 200) {
        callback(checkTokenResponse);
      } else {
        Post.update(post, (modelResponse: TYPE.apiResponse) => {
          callback(modelResponse);
        });
      }
    },
    true
  );
};
export const updateMuniPost = (
  request: { token: string; location: string; post: string },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  const { token, location, post } = request;
  // const postObject = JSON.parse(post);
  checkToken(
    token,
    (checkTokenResponse: TYPE.apiResponse) => {
      // check if code is not positive
      if (checkTokenResponse.code !== 200) {
        // negative code
        callback(checkTokenResponse);
      } else {
        // positive code = 200
          // console.log(Object.keys(request.post));
        Post.updateMuni(
          { post, location },
          (modelResponse: TYPE.apiResponse) => {
            // callback with response
            callback(modelResponse);
          }
        );
      }
    },
    true
  );
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
  if (!props.token) {
    // if token is not present send code/message
    callback(requestError("Token is missing"));
  } else {
    // token is present, check it
    checkToken(
      props.token,
      (checkTokenResponse: TYPE.apiResponse) => {
        // check if code is not positive
        if (checkTokenResponse.code !== 200) {
          // negative code
          callback(checkTokenResponse);
        } else {
          // console.log(checkTokenResponse);

          Post.deletePost(
            {
              postId: props.post,
              user: checkTokenResponse.payload.id
            },
            (modelResponse: TYPE.apiResponse) => {
              // callback with response
              callback(modelResponse);
            }
          );
        }
      },
      true
    );
  }
};
export const deleteMuniPost = (
  props: any,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  if (!props.token) {
    // if token is not present send code/message
    callback(requestError("Token is missing"));
  } else {
    // token is present, check it
    checkToken(
      props.token,
      (checkTokenResponse: TYPE.apiResponse) => {
        // check if code is not positive
        if (checkTokenResponse.code !== 200) {
          // negative code
          callback(checkTokenResponse);
        } else {
          // console.log(checkTokenResponse);

          Post.deleteMuniPost(
            {
              postId: props.post,
              location: props.location
            },
            (modelResponse: TYPE.apiResponse) => {
              // callback with response
              callback(modelResponse);
            }
          );
        }
      },
      true
    );
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
    callback(modelResponse);
  });
};
export const muniPosts = (
  props: TYPE.IncPostsListTYPE,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  Post.listMuni(props, (modelResponse: TYPE.apiResponse) => {
    callback(modelResponse);
  });
};

export const vote = (
  props: { id: string; user: string },
  callback: (arg0: TYPE.apiResponse) => void
) => {
  const { id, user } = props;
  if (id === "" || user === "" || user.length !== 24 || id.length !== 24) {
    callback(Message.requestError("ID/User malformed"));
  } else {
    Post.vote({ id, user }, (modelResponse: TYPE.apiResponse) => {
      callback(modelResponse);
    });
  }
};

export interface replyVoteProps {
  token: string;
  post: string;
  user: string;
  vote: string;
}

export const replyVote = (
  request: replyVoteProps,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  const { token, post, user, vote } = request;

  if (!token) {
    // if token is not present send code/message
    callback(requestError("Token is missing"));
  } else {
    // token is present, check it
    checkToken(
      token,
      (checkTokenResponse: TYPE.apiResponse) => {
        // check if code is not positive
        if (checkTokenResponse.code !== 200) {
          // negative code
          callback(checkTokenResponse);
        } else {
          // positive code = 200
          Post.replyVote(
            {
              post,
              user,
              vote
            },
            (modelResponse: TYPE.apiResponse) => {
              // callback with response
              callback(modelResponse);
            }
          );
        }
      },
      true
    );
  }
};
