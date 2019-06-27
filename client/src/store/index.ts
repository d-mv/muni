import { getMuniPosts } from "./users/posts";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { logger } from "redux-logger";

import { setStep, showHelp, fetchLocations, prevModule } from "./app/reducers";
import { submitPost, updatePost, showPost, deletePost } from "./post/reducers";
import {
  vote,
  setToken,
  checkToken,
  login,
  setModule,
  register,
  setLoading,
  setAuth,
  setLocationData,
  setMessage,
  changeMode,
  loadData,
  setLanguage,
  setPosts,
  typingData,
  cachePost,
  userType,
  setMuniPosts
} from "./users/reducers";
import * as TYPE from "./types";
import { apiState, showPostState, emptyPost } from "./defaults";

import data from "../data/translation.json";
import { showPostPayload } from "./post/types";

const self =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : process.env.REACT_APP_SELF
    ? process.env.REACT_APP_SELF
    : `https://${window.location.hostname}/api`;

axios.defaults.baseURL = self;

const rootReducer = combineReducers({
  vote: vote,
  token: setToken,
  checkTokenResult: checkToken,
  login: login,
  module: setModule,
  prevModule: prevModule,
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
  step: setStep,
  posts: setPosts,
  update: updatePost,
  post: showPost,
  typed: typingData,
  cached: cachePost,
  deleted: deletePost,
  type: userType,
  news: setMuniPosts
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
    prevModule: string;
    locations: [];
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
    vote: TYPE.apiResponse;
    posts: any;
    update: TYPE.apiResponse;
    post: showPostPayload;
    typed: TYPE.indexedObj;
    cached: any;
    deleted: any;
    type: string;
    news: any;
  }

  const initialState: state = {
    token: "",
    checkTokenResult: "",
    login: apiState,
    module: "",
    // module: "welcome",
    prevModule: "welcome",
    locations: [],
    loading: false,
    register: apiState,
    data: data,
    language: data.language["עב"],
    locationData: {},
    auth: false,
    step: 1,
    submitPost: apiState,
    help: false,
    message: "",
    mode: "show",
    vote: apiState,
    posts: [],
    update: apiState,
    post: showPostState,
    typed: {},
    cached: emptyPost,
    deleted: apiState,
    type: "",
    news: []
  };

  const store = createStore(rootReducer, initialState, middleWareEnhancer);

  return store;
}
