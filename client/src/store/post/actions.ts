import { Action, } from "./types";

export * from "./create";
export * from "./update";
export * from "./fetch";

export const setPosts = (posts: any): Action => {
  return { type: "SET_POSTS", payload: posts };
};

export const showPost = (props: any): Action => {
  return { type: "SHOW_POST", payload: { ...props } };
};

export const updatePosts = (props: any) => {
  return { type: "UPDATE_POSTS", payload: { ...props } };
};
