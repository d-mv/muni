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

/**
 * Login type
 * @typedef {Object} login
 * @property {string} email - User's email
 * @property {string} pass - User's password
 */
export interface login {
  email: string;
  pass: string;
}

/**
 * Standard indexed object type
 * @typedef {Object} indexedObj
 * @property {string} index - Indexed string pair
 */
export interface indexedObj {
  [index: string]: string;
}