import { emptyPost } from "./../defaults";
import { Action } from "./types";
import { data, indexedObjAny } from "../types";
import { apiState } from "../defaults";

export const setToken = (state = "", action: Action) => {
  switch (action.type) {
    case "SET":
      return action.token;
  }
  return state;
};
export const setLoading = (state = false, action: Action): boolean => {
  switch (action.type) {
    case "SET_LOADING":
      return action.loading;
  }
  return false;
};

export const checkToken = (state = { token: "" }, action: Action) => {
  switch (action.type) {
    case "CHECK":
      return { ...state, ...action.payload };
  }
  return { ...state };
};

export const changeMode = (state = "login", action: Action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return action.mode;
  }
  return state;
};

export const login = (state = apiState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
  }
  return { ...state };
};

export const setMessage = (state = "", action: Action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.message || state;
  }
  return state;
};

export const register = (state = apiState, action: Action) => {
  switch (action.type) {
    case "REGISTER":
      return { ...state, ...action.payload };
  }
  return { ...state };
};

export const setModule = (state = "", action: Action): string => {
  switch (action.type) {
    case "SET_MODULE":
      return action.module ? action.module : state;
  }
  return state;
};

export const setAuth = (state = false, action: Action): boolean => {
  switch (action.type) {
    case "SET_AUTH":
      return action ? true : false;
  }
  return state;
};

export const setLocationData = (state = {}, action: Action): data => {
  switch (action.type) {
    case "SET_LOCATION_DATA":
      return { ...action.data };
  }
  return state;
};

/**
 * Reducer function to process the loadData action
 * @function loadData
 * @param state
 * @param action
 * @returns {string}
 */
export const loadData = (state = {}, action: Action): data => {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...action.data };
  }
  return state;
};

/**
 * Reducer function to process the setLanguage action
 * @function setLanguage
 * @param state
 * @param action
 * @returns {string}
 */
export const setLanguage = (state = {}, action: Action): indexedObjAny => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...action.data };
  }
  return state;
};

export const vote = (state = apiState, action: Action) => {
  switch (action.type) {
    case "VOTE":
      return action.payload;
  }
  return state;
};

export const fetchData = (state = apiState, action: Action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return action.payload;
  }
  return state;
};

export const setPosts = (state = [], action: Action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.posts;
  }
  return state;
};
export const setMuniPosts = (state = [], action: Action) => {
  switch (action.type) {
    case "SET_MUNIPOSTS":
      return action.posts;
  }
  return state;
};
export const typingData = (state = {}, action: Action) => {
  switch (action.type) {
    case "TYPING_DATA":
      return { ...state, ...action.payload };
  }
  return state;
};

export const cachePost = (state = { cached: emptyPost }, action: Action) => {
  switch (action.type) {
    case "CACHE_POST":
      return { ...state, ...action.post };
  }
  return state;
};

export const userType = (state = {}, action: Action) => {
  switch (action.type) {
    case "USER_TYPE":
      return action.user;
  }
  return state;
};
