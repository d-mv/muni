import { Action } from "./types";
import * as TYPE from "../types";

import data from "../../data/translation.json";

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
