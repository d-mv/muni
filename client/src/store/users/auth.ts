import { LoginProps } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get } from "../services";
import { indexedObjAny } from "../types";

import fromJson from "../../data/translation.json";
const data: indexedObjAny = fromJson;

export const checkToken = (
  token: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  get({ url: "/v2/check", headers: { token } })
    .then(response => {
      const {
        _id,
        location,
        type,
        language,
        token,
        name,
        pinned,
        categories
      } = response.data.payload;
      dispatch({ type: "SET_AUTH", payload: { _id, location } });
      dispatch({
        type: "USER_TYPE",
        user: type
      });
      dispatch({
        type: "SET_LANGUAGE",
        data: data.language[language]
      });
      dispatch({ type: "SET", token });
      dispatch({
        type: "SET_LOCATION_DATA",
        data: { name, pinned, categories }
      });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    })
    .catch(e => {});
};

export const login = (login: LoginProps) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  dispatch({
    type: "LOGIN",
    payload: {}
  });
  dispatch({ type: "TYPING_DATA", payload: { ...login } });

  get({ url: `/v2/user/login?password=${login.password}&email=${login.email}` })
    .then(response => {
      const {
        _id,
        location,
        type,
        language,
        token,
        name,
        pinned,
        categories
      } = response.data.payload;
      dispatch({ type: "SET_AUTH", payload: { _id, location } });
      dispatch({
        type: "USER_TYPE",
        user: type
      });
      dispatch({
        type: "SET_LANGUAGE",
        data: data.language[language]
      });
      dispatch({ type: "SET", token });
      dispatch({
        type: "SET_LOCATION_DATA",
        data: { name, pinned, categories }
      });
       dispatch({
         type: "SET_MESSAGE",
         message: "Loading data..."
       });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    })
    .catch((error: any) => {
      const payload = {
        status: false,
        code: 401,
        message: error.response.data.message
      };
      dispatch({
        type: "SET_MESSAGE",
        message: payload.message
      });
      dispatch({
        type: "LOGIN",
        payload
      });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });
};
