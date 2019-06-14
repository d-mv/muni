import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Action } from "./types";
import * as TYPE from "../types";
import locationsList from "../../modules/locations_list";

import { AnyAction } from "redux";
import { apiState } from "../defaults";

import data from "../../data/translation.json";

const importedData: TYPE.indexedObjAny = data;

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

export const changeMode = (mode: string): Action => {
  return { type: "CHANGE_MODE", mode };
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
          dispatch({
            type: "SET_LANGUAGE",
            data: importedData.language[response.data.payload.lang]
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
    dispatch({
      type: "SET_MESSAGE",
      message: ""
    });
    dispatch({
      type: "SET_LOADING",
      loading: true
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

        console.log(response);
        console.log(response.data);

        dispatch({ type: "SET_MODULE", module });
        dispatch({ type: "SET_AUTH", status: true });
        dispatch({ type: "SET_LOCATION_DATA", data: response.data.payload });
        dispatch({
          type: "SET_MESSAGE",
          message: response.data.message || response.data.payload.message
        });
        dispatch({
          type: "SET_LANGUAGE",
          data: importedData.language[response.data.payload.lang]
        });
        dispatch({ type: "SET", token: response.data.token });
        dispatch({
          type: "LOGIN",
          payload: { ...response.data, code: response.status }
        });
        dispatch({
          type: "SET_LOADING",
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        const payload = error.response ? error.response.data : error.toString();
        if (payload.code === 404) {
          dispatch({
            type: "SET_LOADING",
            loading: false
          });
          dispatch({
            type: "CHANGE_MODE",
            mode: "register"
          });
        } else {
          dispatch({
            type: "SET_MESSAGE",
            message: payload.message || ""
          });
        }
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
    dispatch({
      type: "SET_MESSAGE",
      message: ""
    });
    dispatch({
      type: "SET_LOADING",
      loading: true
    });
    // proceed with request
    axios({
      method: "post",
      url
      // withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        if (!response.data.status) {
          dispatch({
            type: "SET_MESSAGE",
            message: response.data.message
          });
          dispatch({
            type: "SET_LOADING",
            loading: false
          });
        } else {
          dispatch({
            type: "SET_MESSAGE",
            message: response.data.payload.message
          });
          dispatch({ type: "SET_MODULE", module: "confirmation" });
        }
        dispatch({
          type: "SET_LOADING",
          loading: false
        });
        dispatch({
          type: "REGISTER",
          payload: { ...response.data, code: response.status }
        });
      })
      .catch(error => {
        const payload = error.response ? error.response.data : error.toString();
        dispatch({
          type: "SET_MESSAGE",
          message: payload.toString()
        });
        dispatch({
          type: "REGISTER",
          payload
        });
        dispatch({
          type: "SET_LOADING",
          loading: false
        });
      });
  };
};

export const setMessage = (message: string) => {
  return {
    type: "SET_MESSAGE",
    message: message
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



/**
 * Action function to load built-in data
 * @function loadData
 * @param {}
 * @returns {object}
 */
export const loadData = (): Action => {
  return { type: "LOAD_DATA", data };
};

/**
 * Action function to set preferred language
 * @function setLanguage
 * @param {string} lang - Language to choose
 * @returns {object}
 */
export const setLanguage = (lang: string): Action => {
  return { type: "SET_LANGUAGE", data: importedData.language[lang] };
};

/** Action function to store location data
 * @function setLocationData
 * @param {object} data - Location data
 * @returns {object}
 */
export const setLocationData = (data: TYPE.data): Action => {
  return { type: "SET_LOCATION_DATA", data };
};