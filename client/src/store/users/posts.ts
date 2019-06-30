import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { AnyAction } from "redux";

export const getPosts = (
  location: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = `/location/${location}/posts`;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    axios({
      method: "get",
      url
    })
      .then(response => {
        dispatch({
          type: "SET_POSTS",
          posts: response.data.payload
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
};
export const getMuniPosts = (
  location: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = `/location/${location}/muniposts`;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    axios({
      method: "get",
      url
    })
      .then(response => {
        dispatch({
          type: "SET_MUNIPOSTS",
          posts: response.data.payload
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
};
