import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import {  setStep, showHelp } from "./app/reducers";
import { submitPost } from "./post/reducers";
import {
  setToken,
  checkToken,
  login,
  setModuleU,
  register,
  fetchLocations,
  setLoading,
  setAuth,
  setLocationData,
  setMessage,
  changeMode,
  loadData,
  setLanguage
} from "./users/reducers";
import * as TYPE from "./types";
import { apiState } from "./defaults";

import data from "../data/translation.json";

const self =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : process.env.REACT_APP_SELF
    ? process.env.REACT_APP_SELF
    : `https://${window.location.hostname}/api`;

axios.defaults.baseURL = self;

const rootReducer = combineReducers({
  token: setToken,
  checkTokenResult: checkToken,
  login: login,
  module: setModuleU,
  locations: fetchLocations,
  loading: setLoading,
  register: register,
  data: loadData,
  language: setLanguage,
  locationData: setLocationData,
  auth: setAuth,
  submitPost: submitPost,
  help: showHelp,
  message: setMessage,
  mode: changeMode,
  // remove?
  step: setStep
});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunk, logger];

  const middleWareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  interface state {
    token: string;
    checkTokenResult: any;
    login: TYPE.apiResponse;
    module: string;
    locations: any;
    loading: boolean;
    register: TYPE.apiResponse;
    data: TYPE.indexedObjAny;
    language: TYPE.indexedObjAny;
    locationData: TYPE.data;
    auth: boolean;
    step: number;
    submitPost: TYPE.apiResponse;
    help: boolean;
    message: string;
    mode: string;
  }

  const initialState: state = {
    token: "",
    checkTokenResult: "",
    login: apiState,
    module: "",
    locations: "",
    loading: false,
    register: apiState,
    data: data,
    language: data.language.en,
    locationData: {},
    auth: false,
    step: 1,
    submitPost: apiState,
    help: false,
    message: "",
    mode: "login"
  };

  const store = createStore(rootReducer, initialState, middleWareEnhancer);

  return store;
}
