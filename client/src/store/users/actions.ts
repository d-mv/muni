import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Action, checkTokenAction, SET, CHECK } from "./types";
import * as TYPE from "../types";
import locationsList from "../../modules/locations_list";

import { AnyAction } from "redux";
import { apiState } from "../defaults";
// import {setModule} from '../app/actions'

/**
 * Action function to set the token in the state
 * @function setToken
 * @param {string} token
 * @return {Object} - Returns object of action type and token
 */
export const setToken = (token: string): Action => {
  return { type: SET, token };
};
/**
 * Action function to set the token in the state
 * @function setLoading
 * @param {boolean} loading
 * @return {Object} - Returns object of action type and token
 */
export const setLoading = (loading:boolean = false): Action => {
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
        if (payload.status) {
          // if positive - save token, and return the data
          console.log("status positive");
          dispatch(setToken(token));
        }
        // if negative - return the data
        dispatch({
          type: CHECK,
          payload: { ...response.data, code: response.status }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setModuleU = (module: string): Action => {
  console.log(module);
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
        dispatch({ type: "SET_MODULE", module });
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
            payload: { payload:locations, code: response.status }
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
