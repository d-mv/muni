import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { patch, get, del } from "../services";

export const votePost = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  // console.log("vote");
  dispatch({
    type: "SET_LOADING",
    loading: true
  });
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  get({ url: `/posts/${id}/vote` })
    .then(response => {
      // console.log(response);
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({ type: "SET_POSTS", payload: response.data });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });
};

export const updatePost = (updatedPost: any) => async (
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
  patch({ url: `/posts/${updatedPost._id}`, body: updatedPost })
    .then(response => {
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({
        type: "SET_POSTS",
        payload: response.data
      });
    })
    .catch(e => {});
};
export const updateNews = (updatedNews: any) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  console.log("response");
  console.log(updatedNews);
  dispatch({
    type: "SET_LOADING",
    loading: true
  });
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  patch({ url: `/news/${updatedNews._id}`, body: updatedNews })
    .then(response => {
      console.log(response);
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({
        type: "SET_NEWS",
        payload: response.data
      });
    })
    .catch(e => console.log(e));
};
export const deletePost = (id: any) => async (
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
  del({ url: `/posts/${id}` })
    .then(response => {
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({
        type: "SET_POSTS",
        payload: response.data
      });
    })
    .catch(e => {});
};
export const deleteNews = (id: any) => async (
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
  del({ url: `/news/${id}` })
    .then(response => {
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({
        type: "SET_NEWS",
        payload: response.data
      });
    })
    .catch(e => {});
};
export const deletePhoto = (link: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: "SET_LOADING",
    loading: true
  });
  del({ url: `/image`, body: { link } })
    .then(response => {
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    })
    .catch(e => {});
};
