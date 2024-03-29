import { Action } from "./types";

export * from "./create";
export * from "./update";
export * from "./fetch";

export const setPosts = (posts: any): Action => {
  return { type: "SET_POSTS", payload: posts };
};
export const setNews = (news: any): Action => {
  return { type: "SET_NEWS", payload: news };
};

export const showPost = (props: any): Action => {
  return { type: "SHOW_POST", payload: { ...props } };
};
export const clearPost = (): Action => {
  return { type: "CLEAR_POST", payload: { } };
};

export const updatePosts = (props: any) => {
  return { type: "UPDATE_POSTS", payload: { ...props } };
};
