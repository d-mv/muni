import axios from "axios";
import { indexedObj } from "../types";

export const locationsList = (link: string) => axios.get(link);

export const get = (props: { url: string; headers?: indexedObj }) =>
  axios({
    method: "get",
    url: props.url,
    headers: props.headers ? props.headers : null
  });

export const post = (props: { url: string; headers?: indexedObj }) =>
  axios({
    method: "post",
    url: props.url,
    headers: props.headers ? props.headers : null
  });
