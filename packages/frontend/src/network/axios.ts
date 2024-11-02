import { getDataInCookie, storeDataInCookie } from "../utils/utils";
import axios, { AxiosError, AxiosInstance } from "axios";

let tokens: { accessToken: string; refreshToken: string } | null = null;

if (typeof window !== "undefined") {
  tokens = {
    accessToken: getDataInCookie("access_token"),
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
          : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiMDBlOTM1OTQtMTBhNy00MDdjLWJkZjMtMWZiMTUwMWE2YjgzIiwidXNlcklkIjoiZW1tYW51ZWxvYmllY2hpbmE4QGdtYWlsLmNvbSIsImF1dGhQcm92aWRlciI6Im1ldGFtYXNrIiwiaWF0IjoxNzMwNDY2NDc2LCJleHAiOjE3MzA2MzkyNzZ9.qZ_WOo5VQFUTJd7_IP6WE8z5bMk2BPQwzjWqpsBd6mg"
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
