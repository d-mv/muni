import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";

import { Action } from "./types";
import * as TYPE from "../types";

export const submitPost = (
  props: any
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = "/post/create";
  console.log(props);
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // clear state
    // dispatch({
    //   type: "SUBMIT_POST",
    //   payload: ""
    // });
    // proceed with request
    axios
      .post(url, props)
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
