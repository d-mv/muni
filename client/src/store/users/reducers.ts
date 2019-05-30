import { Action } from "./types";
import { apiState } from "../defaults";

export const setToken = (state = "", action: Action): string => {
  switch (action.type) {
    case "SET":
      return action.token ? action.token : state;
  }
  return state;
};
export const setLoading = (state = false, action: Action): boolean => {
  switch (action.type) {
    case "SET_LOADING":
      return action.loading ? action.loading : false;
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

export const login = (state = apiState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
  }
  return { ...state };
};
export const fetchLocations = (state = apiState, action: Action) => {
  switch (action.type) {
    case "FETCH_LOCATIONS":
      return { ...state, ...action.payload };
  }
  return { ...state };
};

export const setModuleU = (state = "", action: Action): string => {
  switch (action.type) {
    case "SET_MODULE":
      return action.module ? action.module : state;
  }
  return state;
};
