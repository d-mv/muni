import { Action } from "./types";
import { apiState } from "../defaults";

export const submitPost = (state = apiState, action: Action) => {
  switch (action.type) {
    case "SUBMIT_POST":
      return { ...state, ...action.payload };
  }
  return state;
};
export const updatePost = (state = apiState, action: Action) => {
  switch (action.type) {
    case "UPDATE_POST":
      return { ...state, ...action.payload };
  }
  return state;
};
