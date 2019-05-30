import { Action } from "./types";

/**
 * Action function to set the module to display
 * @function setModule
 * @param {string} module - Name of the module to show
 * @return {Object} - Returns object of action type and token
 */
export const setModule = (module: string): Action => {
  console.log(module)
  return { type: "SET", module };
};

