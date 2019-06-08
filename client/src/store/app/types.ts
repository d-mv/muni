import { data,indexedObjAny } from "../types";

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

export interface setStep {
  type: "SET_STEP";
  step:number
}

export type Action =
  | loadDataAction
  | setLanguageAction
  | setLocationDataAction
  | setStep;
