import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios, { AxiosResponse } from "axios";
import { Action, LoginProps } from "./types";
import * as TYPE from "../types";

import { AnyAction } from "redux";
import { apiState } from "../defaults";

import data from "../../data/translation.json";

export * from "./posts";
export * from "./auth";
export * from './categories'

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
export const setLoading = (loading: boolean): Action => {
  // console.log(loading)
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
// export const checkToken = (
//   token: string
// ): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//   const url = "/user/check";
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     axios({
//       method: "get",
//       url,
//       headers: { token }
//     })
//       .then(response => {

//         const payload = response.data;
//         console.log(payload);
//         if (payload.status) {
//           dispatch({ type: "SET", token });
//           dispatch({ type: "SET_AUTH", status: true });
//           dispatch({
//             type: "LOGIN",
//             payload: { ...response.data, code: response.status }
//           });
//         } else {
//           dispatch({ type: "SET", token: "clear" });
//           dispatch({
//             type: "SET_LOCATION_DATA",
//             data: ""
//           });
//           dispatch({ type: "SET_AUTH", status: false });
//           // dispatch({ type: "SET_MODULE", module: "login" });
//         }
//         // if negative - return the data
//         dispatch({
//           type: "CHECK",
//           payload: { ...response.data, code: response.status }
//         });
//       })
//       .catch(error => {
//         console.log(error);
//         dispatch({
//           type: "SET_LOCATION_DATA",
//           data: error.data
//         });
//       });
//   };
// };

// export const setAuth = (status: boolean): Action => {
//   return { type: "SET_AUTH", status };
// };

export const setModule = (
  module: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: "SET_MODULE", module });
  };
};

/**
 * Action function to login with API
 * @function login
 * @param {string} email - Email
 * @param {string} pass - Password
 * @return {Promise} - Returns promise resolved with the help of Thunk
 */

export const logOff = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: "SET_AUTH", status: false });
    // dispatch({ type: "SET_MODULE", module: "welcome" });
    dispatch({ type: "SET", token: "clear" });
    dispatch({
      type: "TYPING_DATA",
      payload: { email: "", pass: "", fName: "", lName: "", location: "" }
    });
    dispatch({
      type: "SET_MESSAGE",
      message: ""
    });
    dispatch({
      type: "LOGIN",
      payload: { ...apiState }
    });
    dispatch({
      type: "SET_POSTS",
      posts: []
    });
    dispatch({
      type: "SET_NEWS",
      posts: []
    });
    dispatch({ type: "SET_AUTH", payload: { location: "", _id: "" } });
  };
};

// export const register = (
//   props: TYPE.register
// ): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//   console.log(props);
//   const url = `/user/create?email=${props.email}&location=${props.location}&pass=${props.pass}&fName=${props.fName}&lName=${props.lName}&lang=${props.lang}`;
//   console.log(url);
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
//     // clear state
//     dispatch({
//       type: "REGISTER",
//       payload: apiState
//     });
//     dispatch({
//       type: "SET_MESSAGE",
//       message: ""
//     });
//     dispatch({ type: "TYPING_DATA", payload: { ...props } });

//     // proceed with request
//     axios({
//       method: "post",
//       url
//     })
//       .then((response: AxiosResponse) => {
//         console.log(response.data);
//         if (!response.data.status) {
//           dispatch({
//             type: "SET_MESSAGE",
//             message: response.data.message
//           });
//         } else {
//           // dispatch({
//           //   type: "SET_MESSAGE",
//           //   message: response.data.payload.message
//           // });
//           dispatch({ type: "SET_MODULE", module: "confirmation" });
//         }
//         dispatch({
//           type: "REGISTER",
//           payload: { ...response.data, code: response.status }
//         });
//         dispatch({
//           type: "SET_LOADING",
//           loading: false
//         });
//       })
//       .catch(error => {
//         const payload = error.response ? error.response.data : error.toString();
//         // console.log(payload);
//         dispatch({
//           type: "SET_MESSAGE",
//           message: payload.message
//         });
//         // dispatch({
//         //   type: "REGISTER",
//         //   payload
//         // });
//         dispatch({
//           type: "SET_LOADING",
//           loading: false
//         });
//       });
//   };
// };

export const setMessage = (message: string) => {
  return {
    type: "SET_MESSAGE",
    message: message
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


/** Action function to store location data
 * @function setLocationData
 * @param {object} data - Location data
 * @returns {object}
 */
export const setLocationData = (data: TYPE.data): Action => {
  return { type: "SET_LOCATION_DATA", data };
};

export const setPosts = (posts: any): Action => {
  return { type: "SET_POSTS", posts };
};

export const setLanguage = (
  lang: string,
  user: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // clear state
    dispatch({
      type: "SET_LANGUAGE",
      data: importedData.language[lang]
    });
    if (user) {
      // proceed with request
      const url = `/user/${user}/update?language=${lang}`;
      axios({
        method: "post",
        url
      })
        .then(response => {})
        .catch(error => {
          const payload = error.response
            ? error.response.data
            : error.toString();
        });
    }
  };
};

export const vote = (
  id: string,
  user: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  console.log("voting");
  const url = `/post/${id}/vote?user=${user}`;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // proceed with request
    axios({
      method: "patch",
      url
    })
      .then((response: AxiosResponse<any>) => {
        const payload = response.data;
        dispatch({
          type: "VOTE",
          payload: payload
        });
      })
      .catch(error => {
        dispatch({
          type: "VOTE",
          payload: error.response
        });
      });
  };
};

export const fetchData = (
  token: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = "/user/data";
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // proceed with request
    axios({
      method: "get",
      url,
      headers: { token }
    })
      .then((response: AxiosResponse<any>) => {
        const payload = response.data;
        dispatch({ type: "SET_LOCATION_DATA", data: payload.payload });
        dispatch({
          type: "SET_LANGUAGE",
          data: importedData.language[payload.payload.lang]
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "SET_LOCATION_DATA",
          data: error.data
        });
      });
  };
};
export const typingData = (data: { [index: string]: string }) => {
  return { type: "TYPING_DATA", payload: { ...data } };
};

export const cachePost = (post: TYPE.post): Action => {
  return { type: "CACHE_POST", post };
};

export const muniLogin = (
  props: LoginProps
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  const url = `/muni/login?pass=${props.pass}&email=${props.email}`;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: "SET_LOADING",
      loading: true
    });
    // clear state
    dispatch({
      type: "LOGIN",
      payload: apiState
    });
    dispatch({
      type: "SET_MESSAGE",
      message: ""
    });
    dispatch({ type: "TYPING_DATA", payload: { ...props } });
    // proceed with request
    axios({
      method: "get",
      url
    })
      .then(response => {
        // if successful change page
        if (response.data.status) {
          dispatch({ type: "SET_AUTH", status: true });
          dispatch({ type: "SET_LOCATION_DATA", data: response.data.payload });
          if (response.data.payload.type) {
            dispatch({
              type: "USER_TYPE",
              user: response.data.payload.type
            });
          }
          dispatch({
            type: "SET_LANGUAGE",
            data: importedData.language[response.data.payload.lang]
          });
          dispatch({ type: "SET", token: response.data.token });
        } else {
          dispatch({
            type: "SET_MESSAGE",
            message: response.data.message
          });
        }
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
        dispatch({
          type: "SET_MESSAGE",
          message: payload.message || payload || ""
        });
        dispatch({
          type: "LOGIN",
          payload
        });
      });
  };
};

// TODO: move to utils
export const clearState = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    // dispatch({
    //   type: "TYPING_DATA",
    //   payload: { email: "", pass: "", fName: "", lName: "", location: "" }
    // });
  };
};
