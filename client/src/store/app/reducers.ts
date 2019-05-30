import { Action } from "./types";

/**
 * Reducer function to process the setModule action
 * @function setModule
 * @param state
 * @param action
 * @returns {string}
 */
export const setModule = (state = "", action: Action): string => {
  switch (action.type) {
    case "SET":
      return action.module ? action.module : state;
  }
  return state;
};
