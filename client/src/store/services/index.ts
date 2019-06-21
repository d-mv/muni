import axios from "axios";

export const locationsList = (link: string) => axios.get(link)