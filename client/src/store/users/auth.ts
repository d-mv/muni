import { LoginProps } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get, post } from "../services";
import { indexedObjAny, registerType } from "../types";

import fromJson from "../../data/translation.json";
import { apiState } from "../defaults";
import { AxiosResponse } from "axios";
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

export const register = (props: registerType) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  // clear state
  dispatch({
    type: "REGISTER",
    payload: apiState
  });
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  dispatch({ type: "TYPING_DATA", payload: { ...props } });
  // proceed with request
  post({
    url: `/user/create?email=${props.email}&location=${props.location}&pass=${props.pass}&fName=${props.fName}&lName=${props.lName}&lang=${props.lang}`
  })
    .then((response: AxiosResponse) => {
      dispatch({ type: "SET_MODULE", module: "confirmation" });
      dispatch({
        type: "REGISTER",
        payload: { ...response.data, code: response.status }
      });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    })
    .catch((error: any) => {
      dispatch({
        type: "SET_MESSAGE",
        message: error.response.data.message || error.toString()
      });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });
};
