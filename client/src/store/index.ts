import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { logger } from "redux-logger";

import { loadData, setLanguage, setStep } from "./app/reducers";
import {
  setToken,
  checkToken,
  login,
  setModuleU,
  register,
  fetchLocations,
  setLoading,
  setAuth,
  setLocationData
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

console.log(self);

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
  step: setStep
});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunk, logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  interface state {
    token: string;
    checkTokenResult: any;
    login: TYPE.apiResponse;
    module: string;
    locations: any;
    // locations: TYPE.apiResponse;
    loading: boolean;
    register: TYPE.apiResponse;
    data: TYPE.indexedObjAny;
    language: TYPE.indexedObjAny;
    locationData: TYPE.data;
    auth: boolean;
    step: number;
  }

  const initialState: state = {
    token: "",
    checkTokenResult: "",
    login: apiState,
    module: "welcome",
    locations: "",
    loading: false,
    register: apiState,
    data: data,
    language: data.language.en,
    locationData: {},
    auth: false,
    step: 1
  };

  const store = createStore(rootReducer, initialState, middleWareEnhancer);

  return store;
}
