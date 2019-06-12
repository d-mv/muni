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
 * Login type
 * @typedef {Object} register
 * @property {string} location - Location ID
 * @property {string} fName - User's first name
 * @property {string} lName - User's last name
 * @property {string} email - User's email
 * @property {string} pass - User's password
 * @property {string} avatar - Avatar's URL
 */
export interface register {
  location: string;
  fName: string;
  lName: string;
  email: string;
  pass: string;
  avatar: string;
}

/**
 * Standard indexed object type
 * @typedef {Object} indexedObj
 * @property {string} index - Indexed string pair
 */
export interface indexedObj {
  [index: string]: string;
}
/**
 * Standard indexed object type with any values
 * @typedef {Object} indexedObjAny
 * @property {string} index - Indexed string pair
 */
export interface indexedObjAny {
  [index: string]: any;
}

// /**
//  * Votes object type
//  * @typedef {Object} Votes
//  * @property {number} up
//  * @property {number} down
//  */
// export interface Votes {
//   up: number;
//   down: number;
// }

/**
 * Standard user post object type
 * @typedef {Object} post
 * @property {string} _id
 * @property {string} title
 * @property {string} problem
 * @property {string} solution
 * @property {string} photo
 * @property {string} link
 * @property {string} createdBy
 * @property {Date} date
 * @property {boolean} status
 * @property {Array} votes
 * @property {string} [newsId]
 */
export interface post {
  _id: string;
  category: string;
  title: string;
  text: string;
  photo: string;
  link: string;
  createdBy: string;
  date: string;
  status: string;
  votes: Array<string>;
  newsId?: string;
}

/**
 * Standard data object type
 * @typedef {Object} data
 * @property {index} any
 */
export interface data {
  [index: string]: any;
}
