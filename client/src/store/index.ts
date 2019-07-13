import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { logger } from "redux-logger";

import { setStep, fetchLocations, prevModule, setModule } from "./app/reducers";
import {
  submitPost,
  posts,
  showPost,
  deletePost,
  typingPost,
  setNews
} from "./post/reducers";
import {
  vote,
  setToken,
  checkToken,
  // login,
  register,
  setLoading,
  setAuth,
  // setLocationData,
  showHelp,
  setMessage,
  changeMode,
  loadData,
  setLanguage,
  typingData,
  cachePost,
  userType,
  getCategories
} from "./users/reducers";
import * as TYPE from "./types";
import { apiState, showPostState, emptyPost } from "./defaults";

import data from "../data/translation.json";
import { showPostPayload } from "./post/types";
import { LocationState, AuthState, AUTH_EMPTY_STATE } from "../models";
import { post } from "./types";

const self =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : process.env.REACT_APP_SELF
    ? process.env.REACT_APP_SELF
    : `https://${window.location.hostname}/api`;

axios.defaults.baseURL = self;

const rootReducer = combineReducers({
  newPost: typingPost,
  locations: fetchLocations,
  vote: vote,
  token: setToken,
  checkTokenResult: checkToken,
  // login: login,
  module: setModule,
  prevModule: prevModule,
  loading: setLoading,
  register: register,
  data: loadData,
  language: setLanguage,
  // locationData: setLocationData,
  auth: setAuth,
  submitPost: submitPost,
  help: showHelp,
  message: setMessage,
  mode: changeMode,
  step: setStep,
  posts: posts,
  // update: updatePost,
  post: showPost,
  typed: typingData,
  cached: cachePost,
  deleted: deletePost,
  type: userType,
  news: setNews,
  categories: getCategories
});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunk, logger];

  const middleWareEnhancer = applyMiddleware(...middlewares);

  interface state {
    locations: LocationState;
    token: string;
    checkTokenResult: any;
    newPost: {};
    // login: TYPE.apiResponse;
    module: string;
    prevModule: string;
    loading: boolean;
    register: TYPE.apiResponse;
    data: TYPE.indexedObjAny;
    language: TYPE.indexedObjAny;
    // locationData: TYPE.data;
    auth: AuthState | {};
    step: number;
    submitPost: TYPE.apiResponse;
    help: boolean;
    message: string;
    mode: string;
    vote: TYPE.apiResponse;
    posts: post[];
    // update: TYPE.apiResponse;
    post: showPostPayload;
    typed: TYPE.indexedObj;
    cached: any;
    deleted: any;
    type: string;
    news: any;
    categories: TYPE.indexedObjAny;
  }

  const initialState: state = {
    locations: {},
    token: "",
    checkTokenResult: "",
    newPost: {},
    // login: apiState,
    module: "welcome",
    prevModule: "welcome",
    loading: false,
    register: apiState,
    data: data,
    language: data.language["עב"],
    // locationData: {},
    auth: AUTH_EMPTY_STATE,
    step: 1,
    submitPost: apiState,
    help: false,
    message: "",
    mode: "show",
    vote: apiState,
    posts: [],
    // update: apiState,
    post: showPostState,
    typed: {},
    cached: emptyPost,
    deleted: apiState,
    type: "",
    news: [],
    categories: {}
  };

  const store = createStore(rootReducer, initialState, middleWareEnhancer);

  return store;
}
