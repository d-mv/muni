import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { AnyAction } from "redux";
import { get } from "../services";

export const getPosts = (location: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  get({ url: `/locations/${location}/posts` })
    .then(response => {
      dispatch({
        type: "SET_POSTS",
        posts: response.data
      });
    })
    .catch((e: any) => {
      console.log(e);
    });

export const getNews = (location: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  get({ url: `/locations/${location}/news` })
    .then(response => {
      dispatch({
        type: "SET_NEWS",
        posts: response.data
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
