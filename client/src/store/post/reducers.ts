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

export const showPost = (state = { show: false }, action: Action) => {
  switch (action.type) {
    case "SHOW_POST":
      return { ...state, ...action.payload };
  }
  return state;
};

export const deletePost = (state = {}, action: Action) => {
  switch (action.type) {
    case "DELETE_POST":
      return { ...state, ...action.payload };
  }
  return state;
};
export const typingPost = (state = {}, action: Action) => {
  switch (action.type) {
    case "TYPING_POST_DATA":
      return { ...state, ...action.payload };
  }
  return state;
};
