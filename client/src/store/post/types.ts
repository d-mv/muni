import * as TYPE from "../types";
import { post } from "../types";

export interface submitPostAction {
  type: "SUBMIT_POST";
  payload: TYPE.apiResponse;
}
export interface updatePostAction {
  type: "UPDATE_POST";
  payload: post;
}
export interface setPostsAction {
  type: "SET_POSTS";
  payload: post[];
}
export interface showPostPayload {
  show: boolean;
  type?: string;
  _id?: string;
}
export interface showPostAction {
  type: "SHOW_POST";
  payload: showPostPayload;
}
export interface clearPostAction {
  type: "CLEAR_POST";
  payload: {};
}

export interface deletePostAction {
  type: "DELETE_POST";
  payload: TYPE.apiResponse;
}
export interface typingPostAction {
  type: "TYPING_POST_DATA";
  payload: any;
}
export interface setMuniPostsAction {
  type: "SET_NEWS";
  payload: any;
}
export interface postsLoading {
  type: "POSTS_LOADING";
  payload: boolean;
}

export type Action =
  | clearPostAction
  | postsLoading
  | setMuniPostsAction
  | setPostsAction
  | typingPostAction
  | deletePostAction
  | showPostAction
  | submitPostAction
  | updatePostAction;
