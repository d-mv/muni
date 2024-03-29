import * as TYPE from "../types";
import { data, indexedObjAny } from "../types";
import { CategoryType } from "../../models";

export interface LoginProps {
  email: string;
  pass: string;
}

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
  payload: {
    _id: string;
    location: string;
  };
}
export interface setLocationDataAction {
  type: "SET_LOCATION_DATA";
  data: TYPE.data;
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
export interface fetchDataAction {
  type: "FETCH_DATA";
  payload: TYPE.apiResponse;
}



export interface typingDataAction {
  type: "TYPING_DATA";
  payload: {
    value: string;
    name: string;
  };
}

export interface userTypeAction {
  type: "USER_TYPE";
  user: string;
}
export interface cachePost {
  type: "CACHE_POST";
  post: TYPE.post;
}

export interface getCategoriesAction {
  type: "SET_CATEGORIES";
  payload: CategoryType;
}

export interface showHelpAction {
  type: "SHOW_HELP";
  show: boolean;
}

export type Action =
  | getCategoriesAction
  | userTypeAction
  | cachePost
  | typingDataAction
  | fetchDataAction
  | voteAction
  | setLocationDataAction
  | setLanguageAction
  | loadDataAction
  | setTokenAction
  | checkTokenAction
  | loginAction
  | setModuleUAction
  | setLoadingAction
  | registerAction
  | setAuthAction
  | setLocationDataAction
  | setAuthAction
  | setMessageAction
  | showHelpAction
  | changeModeAction;
