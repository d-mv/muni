import { Action } from "./types";
import { apiState, emptyPost, emptyNewPost } from "../defaults";
import { post } from "../types";

export const submitPost = (state = apiState, action: Action) => {
  switch (action.type) {
    case "SUBMIT_POST":
      return { ...state, ...action.payload };
  }
  return state;
};
export const posts = (state: post[] = [emptyPost], action: Action): post[] => {
  switch (action.type) {
    case "SET_POSTS":
      return action.payload;
    case "UPDATE_POST":
      return [...state, action.payload];
  }
  return state;
};

export const showPost = (state = { show: false }, action: Action) => {
  switch (action.type) {
    case "SHOW_POST":
      return { ...state, ...action.payload };
    case "CLEAR_POST":
      return emptyNewPost;
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

export const setNews = (state = [], action: Action) => {
  switch (action.type) {
    case "SET_NEWS":
      return action.payload;
  }
  return state;
};

export const postsLoading = (state = false, action: Action) => {
  switch (action.type) {
    case "POSTS_LOADING":
      return action.payload;
  }
  return state;
};
