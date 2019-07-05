import { LoginProps } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get, post } from "../services";
import { indexedObjAny, registerType } from "../types";

import fromJson from "../../data/translation.json";
import { apiState } from "../defaults";
import { AxiosResponse } from "axios";
const data: indexedObjAny = fromJson;

export const checkToken = (token: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  get({ url: "/users/check", headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      console.log(response);
      const { _id, location, type, settings } = response.data.user;
      dispatch({
        type: "SET_AUTH",
        payload: { status: true, user: { _id, location, type, settings } }
      });
      dispatch({
        type: "SET_LANGUAGE",
        data: data.language[settings.language]
      });
      dispatch({ type: "SET", token });
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
      dispatch({ type: "SET", token:'clear' });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });
};

export const login = (login: LoginProps) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  dispatch({ type: "TYPING_DATA", payload: { ...login } });
  post({ url: "/users/login", body: login })
    .then(response => {
      const { token } = response.data;
      const { _id, location, type, settings } = response.data.user;
      dispatch({
        type: "SET_AUTH",
        payload: { status: true, user: { _id, location, type, settings } }
      });
      dispatch({
        type: "SET_LANGUAGE",
        data: data.language[settings.language]
      });
      dispatch({ type: "SET", token });
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
      const { message } = error.response.data;
      dispatch({
        type: "SET_MESSAGE",
        message: message.split("Error: ")[1]
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
