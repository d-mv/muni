// import { fetchLocations } from "./actions";
import { Action } from "./types";
import * as TYPE from "../types";
import data from "../../data/translation.json";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export * from './locations'

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
 * @param {number} step - Step number
 * @returns {object}
 */
export const setStep = (step: number): Action => {
  return { type: "SET_STEP", step };
};
/** Action function to show/hide help
 * @param {number} step - Step number
 * @returns {object}
 */
export const showHelp = (show: boolean): Action => {
  return { type: "SHOW_HELP", show };
};



export const setModule = (
  previous: string,
  next: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: "PREV_MODULE", module:previous });
    dispatch({ type: "SET_MODULE", module: next });
  };
};
