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
    const { data } = await instance.post(`/auth/github/callback`, {
      code,
    });

    console.log(data);
    const token = data.token.split(" ")[1];
    storeDataInCookie("accessToken", token, 1);
    return data;
  } catch (error) {
    console.error(error);
  }
};
