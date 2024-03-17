import axios, { AxiosError } from "axios";
import { Api } from "./Api";

// Базовый путь
const $api = axios.create({
  withCredentials: true,
  baseURL: `${Api.server}/api`,
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${Api.server}/api/auth/refresh`, {
          withCredentials: true,
        });
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Вы не авторизованы");
        return e as AxiosError;
      }
    }
    throw error;
  }
);

export default $api;
