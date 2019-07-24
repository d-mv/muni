import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get } from "../services";

export const getPosts = (location: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  console.log("getposts");
  dispatch({ type: "POSTS_LOADING", payload: true });
  get({ url: `/locations/${location}/posts` })
    .then(response => {
      console.log("getposts");
      dispatch({
        type: "SET_POSTS",
        payload: response.data
      });
      dispatch({ type: "POSTS_LOADING", payload: false });
    })
    .catch((e: any) => {
      console.log(e);
      dispatch({ type: "POSTS_LOADING", payload: false });
    });
};

export const getNews = (location: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  console.log("response");
  dispatch({ type: "POSTS_LOADING", payload: true });
  get({ url: `/locations/${location}/news` })
    .then(response => {
      console.log(response);
      dispatch({
        type: "SET_NEWS",
        payload: response.data
      });
      dispatch({ type: "POSTS_LOADING", payload: false });
    })
    .catch((e: any) => {
      console.log(e);
      dispatch({ type: "POSTS_LOADING", payload: false });
    });
};
