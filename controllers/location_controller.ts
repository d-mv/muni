import * as User from "../models/user_model";
import * as Location from "../models/location_model";
import * as Post from "../models/post_model";
import { checkToken } from "../modules/check_token";

import {
  apiResponseTYPE,
  IncPostsListTYPE,
  IncNewLocationTYPE
} from "../src/types";

import { checkTokenLength, dropQuotes } from "../modules/check_strings";
import { stringify } from "querystring";

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
export const create = (
  props: { query: IncNewLocationTYPE; token: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check su token
  const tokenCheckResult = props.token && typeof props.token === "string";
  const tokenLength = checkTokenLength(dropQuotes(props.token));
  if (tokenCheckResult && tokenLength.status) {
    // check if su
    User.suCheckToken(props.token, (modelResponse: apiResponseTYPE) => {
      if (modelResponse.status) {
        Location.create(props.query, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      } else {
        callback(modelResponse);
      }
    });
  } else {
    callback(tokenLength);
  }
  // check fields
  // const checkQuery =
  //   props.query &&
  //   typeof props.query === "object" &&
  //   props.query.photo &&
  //   typeof props.query.photo === "string" &&
  //   props.query.name &&
  //   typeof props.query.name === "object" &&
  //   props.query.name.en &&
  //   props.query.name.he &&
  //   typeof props.query.name.en === "string" &&
  //   typeof props.query.name.he === "string";

  // console.log(checkQuery);
  // const checkResult = checkFieldsLocationNew({ query: props.query });

  // ask model
  // callback();
};
export const update = (
  props: {
    location: string;
    query: { [index: string]: string };
    token: string;
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check su token
  const tokenCheckResult = props.token && typeof props.token === "string";
  const tokenLength = checkTokenLength(dropQuotes(props.token));
  if (tokenCheckResult && tokenLength.status) {
    // check if su
    User.suCheckToken(props.token, (modelResponse: apiResponseTYPE) => {
      if (modelResponse.status) {
        const query = { location: props.location, fields: { ...props.query } };
        Location.update(query, (modelResponse: apiResponseTYPE) => {
          callback(modelResponse);
        });
      } else {
        callback(modelResponse);
      }
    });
  } else {
    callback(tokenLength);
  }
};
export const deleteLocation = (
  props: {
    location: string;
    token: string;
  },
  callback: (arg0: apiResponseTYPE) => void
) => {
  // check su token
  const tokenCheckResult = props.token && typeof props.token === "string";
  const tokenLength = checkTokenLength(dropQuotes(props.token));
  if (tokenCheckResult && tokenLength.status) {
    // check if su
    User.suCheckToken(props.token, (modelResponse: apiResponseTYPE) => {
      if (modelResponse.status) {
        Location.deleteLocation(
          props.location,
          (modelResponse: apiResponseTYPE) => {
            callback(modelResponse);
          }
        );
      } else {
        callback(modelResponse);
      }
    });
  } else {
    callback(tokenLength);
  }
};
