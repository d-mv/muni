import { Action, tokenState, actionsResponse } from "./types";
import { apiState } from "../defaults";

export const setToken = (state = "", action: Action): string => {
  switch (action.type) {
    case "SET":
      return action.token ? action.token : state;
  }
  return state;
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


