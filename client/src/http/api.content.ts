import axios from "axios";
import { Api } from "./Api";

export const $content = axios.create({
  withCredentials: true,
  baseURL: `${Api.server}/api`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});
