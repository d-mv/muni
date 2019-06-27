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

export interface deletePostAction {
  type: "DELETE_POST";
  payload: TYPE.apiResponse;
}

export type Action =
  | deletePostAction
  | showPostAction
  | submitPostAction
  | updatePostAction;
