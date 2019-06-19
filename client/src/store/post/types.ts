import * as TYPE from "../types";

export interface submitPostAction {
  type: "SUBMIT_POST";
  payload: TYPE.apiResponse;
}
export interface updatePostAction {
  type: "UPDATE_POST";
  payload: TYPE.apiResponse;
}

export interface showPostAction {
  type: "SHOW_POST";
  payload: TYPE.data;
}

export type Action = showPostAction | submitPostAction | updatePostAction;
