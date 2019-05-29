export interface tokenState {
  token: string;
}

/**
 * API response type
 * @typedef {Object} apiResponse
 * @property {boolean} status - Status for the action
 * @property {string} message - Message with response, including errors
 * @property {number} code - HTTP code for the response
 * @property {string} [level] -Optional, required to forward super-user status
 * @property {object} [payload] -Optional payload - ID, posts and etc.
 */
export interface apiResponse {
  status: boolean;
  message: string;
  code: number;
  level?: string;
  payload?: any;
}

export interface actionsResponse {
  type: string;
  payload: any;
}



export interface checkTokenAction {
  type: "CHECK";
  payload: apiResponse;
}

export interface setTokenAction {
  type: "SET";
  token: string;
}

export interface loginAction {
  type: "LOGIN";
  payload:apiResponse
}
export interface setModuleUAction {
  type: "SET_MODULE";
  module: string;
}
export const CHECK = "CHECK";
export const SET = "SET";

export type Action =
  | setTokenAction
  | checkTokenAction
  | loginAction
  | setModuleUAction;
