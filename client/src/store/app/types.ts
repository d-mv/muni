import * as TYPE from "../types";

import { data, indexedObjAny } from "../types";

export interface loadDataAction {
  type: "LOAD_DATA";
  data: indexedObjAny;
}
export interface setLanguageAction {
  type: "SET_LANGUAGE";
  data: indexedObjAny;
}

export interface setLocationDataAction {
  type: "SET_LOCATION_DATA";
  data: data;
}

export interface setStepAction {
  type: "SET_STEP";
  step: number;
}
export interface showHelpAction {
  type: "SHOW_HELP";
  show: boolean;
}
export interface fetchLocationsAction {
  type: "FETCH_LOCATIONS";
  payload: TYPE.apiResponse;
}

export interface prevModuleAction {
  type: "PREV_MODULE";
  module:string
}
export interface setModuleAction {
  type: "SET_MODULE";
  module:string
}
export type Action =
  | setModuleAction
  | prevModuleAction
  | fetchLocationsAction
  | loadDataAction
  | setLanguageAction
  | setLocationDataAction
  | setStepAction
  | showHelpAction;
