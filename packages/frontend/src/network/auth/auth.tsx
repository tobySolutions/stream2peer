import { storeDataInCookie } from "../../utils/utils";
import instance from "../axios";
import { GoogleAuthUrlResponse } from "./types";

// export const login = async (payload: AddProjectProps) => {
//   const { data } = await instance.post(`/project/create`, payload);
//   return data;
// };
export const generateAuthWithGoogleUrl =
  async (): Promise<GoogleAuthUrlResponse> => {
    const { data } = await instance.get(`/auth/google`);
    return data;
  };

export const generateAuthWithGithubUrl =
  async (): Promise<GoogleAuthUrlResponse> => {
    const { data } = await instance.get(`/auth/github`);
    return data;
  };

// export const generateßAuthWithGithubUrl =
//   async (): Promise<GoogleAuthUrlResponse> => {
//     const { data } = await instance.post(`/auth/github`, {});
//     return data;
//   };

export const getUserDetails = async (code: string) => {
  try {
    const response = await instance.post(
      `/auth/google/callback?code=${code}`,
      {}
    );

    // const token = headers["Authorization"].split(" ")[1];

    // console.log(token);

    // storeDataInCookie("accessToken", token, 1);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
