import * as TYPE from "../types";
import { data, indexedObjAny } from "../types";

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

export interface setAuthAction {
  type: "SET_AUTH";
  status: boolean;
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

export interface setMessageAction {
  type: "SET_MESSAGE";
  message: string;
}

export interface setAuthAction {
  type: "SET_AUTH";
  status: boolean;
}
export interface setLocationDataAction {
  type: "SET_LOCATION_DATA";
  data: TYPE.data;
}
export interface fetchLocationsAction {
  type: "FETCH_LOCATIONS";
  payload: TYPE.apiResponse;
}
export interface changeModeAction {
  type: "CHANGE_MODE";
  mode: string;
}

export interface loadDataAction {
  type: "LOAD_DATA";
  data: indexedObjAny;
}
export interface setLanguageAction {
  type: "SET_LANGUAGE";
  data: indexedObjAny;
}

export interface setLocationDataAction {
  type: "SET_LOCATION_DATA";
  data: data;
}
export interface voteAction {
  type: "VOTE";
  payload: TYPE.apiResponse;
}

export interface setPostsAction {
  type: "SET_POSTS";
  posts: any;
}

export type Action =
  | setPostsAction
  | voteAction
  | setLocationDataAction
  | setLanguageAction
  | loadDataAction
  | setTokenAction
  | checkTokenAction
  | loginAction
  | setModuleUAction
  | fetchLocationsAction
  | setLoadingAction
  | registerAction
  | setAuthAction
  | setLocationDataAction
  | setAuthAction
  | setMessageAction
  | changeModeAction;
