import { getDataInCookie } from "../utils/utils";
import axios, { AxiosInstance } from "axios";

let tokens: { accessToken: string; refreshToken: string } | null = null;

if (typeof window !== "undefined") {
  tokens = {
    accessToken: getDataInCookie("accessToken"),
    refreshToken: getDataInCookie("refresh_token"),
  };
}

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // if (tokens?.accessToken) {
    config.headers["Authorization"] = `Bearer ${
      tokens?.accessToken
        ? tokens?.accessToken
        : import.meta.env.VITE_TEMP_AUTH_TOKEN
    }`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return instance(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }
//     }
//   }
// );

export default instance;
