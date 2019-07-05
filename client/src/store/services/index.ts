import axios from "axios";
import { indexedObj, indexedObjAny } from "../types";

export const locationsList = (link: string) => axios.get(link);

export const get = (props: { url: string; headers?: indexedObj }) =>
  axios({
    method: "get",
    url: props.url,
    headers: props.headers ? props.headers : null
  });

export const post = (props: {
  url: string;
  headers?: indexedObj;
  body?: indexedObjAny;
}) =>
  axios({
    method: "post",
    url: props.url,
    headers: props.headers ? props.headers : null,
    data: props.body ? props.body : null
  });
