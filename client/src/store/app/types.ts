import { data } from "../types";

export interface loadDataAction {
  type: "LOAD_DATA";
  data: { [index: string]: any };
}
export interface setLanguageAction {
  type: "SET_LANGUAGE";
  data: { [index: string]: any };
}

export interface setLocationDataAction {
  type: "SET_LOCATION_DATA";
  data: data;
}

export type Action = loadDataAction | setLanguageAction | setLocationDataAction;
