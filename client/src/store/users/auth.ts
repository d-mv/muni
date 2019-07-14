import { LoginProps } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get, post } from "../services";
import { indexedObjAny, registerType } from "../types";

import fromJson from "../../data/translation.json";
import { apiState } from "../defaults";
import { AxiosResponse } from "axios";
const data: indexedObjAny = fromJson;

export const checkToken = (token: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  get({ url: "/users/check", headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
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
      dispatch({ type: "SET", token: "clear" });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });

export const login = (login: LoginProps) => async (
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
      dispatch({ type: "TYPING_DATA", payload: { email: "", pass: "" } });
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
export const muniLogin = (login: LoginProps) => async (
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
  post({ url: "/users/munilogin", body: login })
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
      dispatch({ type: "TYPING_DATA", payload: { email: "", pass: "" } });
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
) => {
  dispatch({
    type: "SET_LOADING",
    loading: true
  });
  dispatch({
    type: "SET_MESSAGE",
    message: ""
  });
  dispatch({ type: "TYPING_DATA", payload: { ...props } });
  post({ url: "/users", body: props })
    .then((response: any) => {
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
      dispatch({ type: "SET_MODULE", module: "confirmation" });
    })
    .catch(e => {
      dispatch({
        type: "SET_MESSAGE",
        message: "Email already registered"
      });
      dispatch({
        type: "SET_LOADING",
        loading: false
      });
    });
};

export const logOff = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  post({ url: "http://localhost:8080/api/users/logout" })
    .then((response: any) => {
      dispatch({ type: "SET", token: "clear" });
      dispatch({
        type: "TYPING_DATA",
        payload: { email: "", pass: "", fName: "", lName: "", location: "" }
      });
      dispatch({
        type: "LOGIN",
        payload: { ...apiState }
      });
      dispatch({
        type: "SET_MESSAGE",
        message: ""
      });
      dispatch({
        type: "SET_AUTH",
        payload: {
          status: false,
          user: {
            location: "",
            settings: { language: "עב", help: false },
            type: "user",
            _id: ","
          }
        }
      });
    })
    .catch((e: any) => {
      console.log(e);
    });

export const typingData = (data: { [index: string]: any }) => ({
  type: "TYPING_DATA",
  payload: data
});
