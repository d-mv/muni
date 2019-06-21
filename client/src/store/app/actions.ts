// import { fetchLocations } from "./actions";
import { Action } from "./types";
import * as TYPE from "../types";
import data from "../../data/translation.json";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import locationsList from "../../modules/locations_list";
import request from "../services";

const importedData: TYPE.indexedObjAny = data;

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

/** Action function to change step when creating new post
 *
 * @param {number} step - Step number
 *
 * @returns {object}
 */
export const setStep = (step: number): Action => {
  return { type: "SET_STEP", step };
};
/** Action function to show/hide help
 *
 * @param {number} step - Step number
 *
 * @returns {object}
 */
export const showHelp = (show: boolean): Action => {
  return { type: "SHOW_HELP", show };
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
    try {
      const response: any = await request.locationsList;
      const { status, code, message, payload } = response.data;
      if (status && payload) {
        dispatch({
          type: "FETCH_LOCATIONS",
          payload: {
            message,
            status,
            code,
            payload: locationsList(payload, "עב")
          }
        });
      } else {
        dispatch({
          type: "FETCH_LOCATIONS",
          payload: { message, status, code }
        });
      }
    } catch (error) {
      const payload = error.response ? error.response.data : error.toString();
      dispatch({
        type: "FETCH_LOCATIONS",
        payload
      });
    }
  };
};

export const prevModule = (module: string): Action => {
  return { type: "PREV_MODULE", module };
};
