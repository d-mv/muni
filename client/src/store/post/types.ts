import * as TYPE from "../types";

export interface submitPostAction {
  type: "SUBMIT_POST";
  payload: TYPE.apiResponse;
}
export interface updatePostAction {
  type: "UPDATE_POST";
  payload: TYPE.apiResponse;
}

export type Action = submitPostAction | updatePostAction;
