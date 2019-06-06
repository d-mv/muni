import * as TYPE from "../types";

export interface checkTokenAction {
  type: "CHECK";
  payload: TYPE.apiResponse;
}

export interface setTokenAction {
  type: "SET";
  token: string;
}
export interface setLoadingAction {
  type: "SET_LOADING";
  loading: boolean;
}

export interface loginAction {
  type: "LOGIN";
  payload: TYPE.apiResponse;
}
export interface registerAction {
  type: "REGISTER";
  payload: TYPE.apiResponse;
}
export interface setModuleUAction {
  type: "SET_MODULE";
  module: string;
}
export interface setAuthAction {
  type: "SET_AUTH";
  status: boolean
}
export interface setLocationDataAction {
  type: "SET_LOCATION_DATA";
  data: TYPE.data;
}
export interface fetchLocationsAction {
  type: "FETCH_LOCATIONS";
  payload: TYPE.apiResponse;
}

export type Action =
  | setTokenAction
  | checkTokenAction
  | loginAction
  | setModuleUAction
  | fetchLocationsAction
  | setLoadingAction
  | registerAction
  | setAuthAction
  | setLocationDataAction;
