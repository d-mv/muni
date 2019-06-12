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

export type Action =
  | loadDataAction
  | setLanguageAction
  | setLocationDataAction
  | setStepAction
  | showHelpAction;
