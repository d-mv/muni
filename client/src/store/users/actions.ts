import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Action } from "./types";
import * as TYPE from "../types";
import locationsList from "../../modules/locations_list";

import { AnyAction } from "redux";
import { apiState } from "../defaults";

/**
 * Action function to set the token in the state
 * @function setToken
 * @param {string} token
 * @return {Object} - Returns object of action type and token
 */
export const setToken = (token: string): Action => {
  return { type: "SET", token };
};
/**
 * Action function to set the token in the state
 * @function setLoading
 * @param {boolean} loading
 * @return {Object} - Returns object of action type and token
 */
export const setLoading = (loading: boolean = false): Action => {
  return { type: "SET_LOADING", loading };
};

/**
 * Action function to verify the token with API
 * @function checkToken
 * @param {string} token
 * @return {Promise} - Returns promise resolved with the help of Thunk
 */
export const checkToken = (
  token: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = "/user/check";
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    axios({
      method: "get",
      url,
      headers: { token }
    })
      .then(response => {
        const payload = response.data;
        console.log(response.data);
        console.log("checktoken - payload.status: " + payload.status);
        if (payload.status) {
          // if positive - save token, and return the data
          dispatch({ type: "SET_LOCATION_DATA", data: payload.payload });
          dispatch({ type: "SET", token });
          dispatch({ type: "SET_AUTH", status: true });
          dispatch({
            type: "LOGIN",
            payload: { ...response.data, code: response.status }
          });
          // dispatch({type:"SET_MODULE",})
        } else {
          dispatch({
            type: "SET_LOCATION_DATA",
            data: ""
          });
          dispatch({ type: "SET", token: "clear" });
          dispatch({ type: "SET_AUTH", status: false });
          dispatch({ type: "SET_MODULE", module: "login" });
        }
        // if negative - return the data
        dispatch({
          type: "CHECK",
          payload: { ...response.data, code: response.status }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setAuth = (status: boolean): Action => {
  return { type: "SET_AUTH", status };
};

export const setModule = (module: string): Action => {
  return { type: "SET_MODULE", module };
};

/**
 * Action function to login with API
 * @function login
 * @param {string} email - Email
 * @param {string} pass - Password
 * @return {Promise} - Returns promise resolved with the help of Thunk
 */
export const login = (
  props: TYPE.login
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = `/user/login?pass=${props.pass}&email=${props.email}`;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // clear state
    dispatch({
      type: "LOGIN",
      payload: apiState
    });
    // proceed with request
    axios({
      method: "get",
      url
      // withCredentials: true
    })
      .then(response => {
        // if successful change page
        const module = "home";
        const token = response.data.token;
        dispatch({ type: "SET_MODULE", module });
        dispatch({ type: "SET_AUTH", status: true });
        dispatch({ type: "SET_LOCATION_DATA", data: response.data.payload });
        dispatch({ type: "SET", token: response.data.token });
        dispatch({
          type: "LOGIN",
          payload: { ...response.data, code: response.status }
        });
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
        dispatch({
          type: "LOGIN",
          payload
        });
      });
  };
};

export const logOff = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: "SET_AUTH", status: false });
    dispatch({ type: "SET_MODULE", module: "welcome" });
    dispatch({ type: "SET", token: "clear" });
    dispatch({
      type: "LOGIN",
      payload: { ...apiState }
    });
  };
};

/**
 * Action function to register with API
 * @function register
 * @param {string} location - Location ID
 * @param {string} fName - User's first name
 * @param {string} lName - User's last name
 * @param {string} email - User's email
 * @param {string} pass - User's password
 * @param {string} avatar - Avatar's URL
 * @return {Promise} - Returns promise resolved with the help of Thunk
 */
export const register = (
  props: TYPE.register
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  console.log(props);
  const url = `/user/create?email=${props.email}&location=${props.location}&pass=${props.pass}&fName=${props.fName}&lName=${props.lName}`;
  console.log(url);
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // clear state
    dispatch({
      type: "REGISTER",
      payload: apiState
    });
    // proceed with request
    axios({
      method: "post",
      url
      // withCredentials: true
    })
      .then(response => {
        dispatch({
          type: "REGISTER",
          payload: { ...response.data, code: response.status }
        });
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
        dispatch({
          type: "REGISTER",
          payload
        });
      });
  };
};

/**
 * Action function to fetch list of locations from API
 * @function fetchLocations
 * @return {Promise} - Returns promise resolved with the help of Thunk
 */
export const fetchLocations = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  const url = "/location/list";
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    axios({
      method: "get",
      url
    })
      .then(response => {
        // locations
        let locations: Array<any>[];
        if (response.data.status && response.data.payload) {
          locations = locationsList(response.data.payload, "en");
          dispatch({
            type: "FETCH_LOCATIONS",
            payload: { payload: locations, code: response.status }
          });
        } else {
          dispatch({
            type: "FETCH_LOCATIONS",
            payload: { code: response.status }
          });
        }
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
        dispatch({
          type: "FETCH_LOCATIONS",
          payload
        });
      });
  };
};
