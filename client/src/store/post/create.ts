import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { post } from "../services";
import { data } from "../types";

export const typingPost = (data: { [index: string]: any }) => ({
  type: "TYPING_POST_DATA",
  payload: data
});

export const createPost = (newPost: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: "SET_LOADING",
    loading: true
  });
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  post({ url: "/posts", body: newPost })
    .then((response: any) => {
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({ type: "SET_MODULE", module: "home" });
    })
    .catch((e: any) => {
      console.log(e);
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });
};
