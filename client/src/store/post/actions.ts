import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";

import { Action, showPostPayload } from "./types";
import * as TYPE from "../types";

export const submitPost = (
  props: any
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = "/post/create";
  console.log(props);
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // proceed with request
    axios
      .post(url, props, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        dispatch({
          type: "SUBMIT_POST",
          payload: {
            ...response.data,
            code: response.status
          }
        });
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
        dispatch({
          type: "SUBMIT_POST",
          payload
        });
      });
  };
};

export const updatePost = (
  props: any
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = `/post/${props._id}`;
  console.log(props);
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // proceed with request
    axios
      .patch(url, props)
      .then(response => {
        dispatch({
          type: "UPDATE_POST",
          payload: {
            ...response.data,
            code: response.status
          }
        });
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
        dispatch({
          type: "UPDATE_POST",
          payload
        });
      });
  };
};



export const showPost = (props: showPostPayload): Action => {
  return { type: "SHOW_POST", payload: { ...props } };
};

export const updatePosts = (props: any) => {
  return {type:"UPDATE_POSTS",payload: {...props}}
}