import * as TYPE from "../types";

export interface submitPostAction {
  type: "SUBMIT_POST";
  payload: TYPE.apiResponse;
}
export interface updatePostAction {
  type: "UPDATE_POST";
  payload: TYPE.apiResponse;
}

export interface showPostPayload {
  show: boolean;
  type?: string;
  _id?: string;
}
export interface showPostAction {
  type: "SHOW_POST";
  payload: showPostPayload;
}

export type Action = showPostAction | submitPostAction | updatePostAction;
