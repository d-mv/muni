import { ObjectId } from "bson";
export interface LoginProps {
    email: string;
    password: string;
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
export interface newPostRequestObject {
    category: "string";
    link: string;
    photo: string;
    problem: string;
    solution: string;
    title: string;
}
export interface newPostRequest {
    user: string;
    location: string;
    post: newPostRequestObject;
}
export interface votesTYPE {
    up: number;
    down: number;
}
export interface newPostTYPE {
    title: string;
    text: string;
    photo: string;
    link: string;
    type: string;
    newsId: string;
    status: boolean;
    votes: votesTYPE;
}
export interface newPostTYPE {
    post: newPostTYPE;
    user: string;
}
export interface intApiResponseTYPE {
    status: boolean;
    payload?: any;
}
export interface IncPostsListTYPE {
    location: string;
    user: string;
    level: string;
}
export interface TokenTYPE {
    location: string;
    token: string;
}
export interface IncPostsListToModelTYPE {
    location: string;
    options?: {
        byUser: boolean;
        userId: string;
    };
}
export interface IncUserCreateTYPE {
    fName: string;
    lName: string;
    avatar: string;
    email: string;
    pass: string;
    posts?: [];
    settings?: {};
    location: string;
    lang: string;
}
export interface UserTYPE {
    fName: string;
    lName: string;
    avatar: string;
    email: string;
    pass: string;
    posts?: [];
    settings?: {};
}
export interface IncLoginTYPE {
    email: string;
    pass: string;
    location?: string;
}
export interface IncNewLocationTYPE {
    name: {
        [index: string]: string;
    };
    photo: string;
}
export interface LocationTYPE {
    _id?: ObjectId;
    name: {
        [index: string]: string;
    };
    photo: string;
}
export interface NewUserTYPE {
    _id: ObjectId;
    location: ObjectId;
    fName: string;
    lName: string;
    email: string;
    pass: string;
    posts: [];
    settings: {};
    language: string;
}
export interface IncUserIdTYPE {
    id: string;
    token: string;
}
/**
 * Standard data object type
 * @typedef {Object} data
 * @property {index} any
 */
export interface data {
    [index: string]: any;
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
