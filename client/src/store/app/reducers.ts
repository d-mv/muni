import { Action } from "./types";
import { data } from "../types";

/**
 * Reducer function to process the loadData action
 * @function loadData
 * @param state
 * @param action
 * @returns {string}
 */
export const loadData = (state = {}, action: Action): data => {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...action.data };
  }
  return state;
};

/**
 * Reducer function to process the setLanguage action
 * @function setLanguage
 * @param state
 * @param action
 * @returns {string}
 */
export const setLanguage = (state = {}, action: Action): data => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...action.data };
  }
  return state;
};
/**
 * Reducer function to process the setLocationData action
 * @function setLocationData
 * @param state
 * @param action
 * @returns {string}
 */
// export const setLocationData = (state = {}, action: Action): data => {
//   switch (action.type) {
//     case "SET_LOCATION_DATA":
//       return { ...action.data };
//   }
//   return state;
// };
