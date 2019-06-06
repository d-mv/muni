import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { logger } from "redux-logger";

import { loadData, setLanguage } from "./app/reducers";
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

console.log(process.env.REACT_APP_SELF);

// set default url for API
// axios.defaults.baseURL = process.env.REACT_APP_SELF
//   ? `${process.env.REACT_APP_SELF}`
//   : "/api";
axios.defaults.baseURL = "http://muni-dev.herokuapp.com/api";

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
  auth: setAuth
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
    auth: false
  };

  const store = createStore(rootReducer, initialState, middleWareEnhancer);

  return store;
}
