export interface loadDataAction {
  type: "LOAD_DATA";
  data: {[index:string]:any};
}
export interface setLanguageAction {
  type: "SET_LANGUAGE";
  data: {[index:string]:any};
}
export interface data {
  [index:string]:any
}
export type Action = loadDataAction | setLanguageAction;
