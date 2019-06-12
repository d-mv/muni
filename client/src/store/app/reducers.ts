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
 * Reducer function to process the setStep action
 *
 * @param state
 * @param action
 *
 * @returns {string}
 */
export const setStep = (state = 1, action: Action): number => {
  switch (action.type) {
    case "SET_STEP":
      return action.step;
  }
  return state;
};

/**
 * Reducer function to process the showHelp action
 *
 * @param state
 * @param action
 *
 * @returns {string}
 */
export const showHelp = (state = false, action: Action): boolean => {
  switch (action.type) {
    case "SHOW_HELP":
      return action.show;
  }
  return state;
};
