import * as TYPE from "../types";

export interface tokenState {
  token: string;
}

export interface actionsResponse {
  type: string;
  payload: any;
}

export interface checkTokenAction {
  type: "CHECK";
  payload: TYPE.apiResponse;
}

export interface setTokenAction {
  type: "SET";
  token: string;
}

export interface loginAction {
  type: "LOGIN";
  payload: TYPE.apiResponse;
}
export interface setModuleUAction {
  type: "SET_MODULE";
  module: string;
}
export interface fetchLocationsAction {
  type: "FETCH_LOCATIONS";
  payload: TYPE.apiResponse;
}
export const CHECK = "CHECK";
export const SET = "SET";

export type Action =
  | setTokenAction
  | checkTokenAction
  | loginAction
  | setModuleUAction
  | fetchLocationsAction;
