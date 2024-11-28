import { toast } from "react-toastify";
import { storeDataInCookie } from "../../utils/utils";
import instance from "../axios";
import { GoogleAuthUrlResponse, User } from "./types";

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

// export const generateAuthWithGithubUrl =
//   async (): Promise<GoogleAuthUrlResponse> => {
//     const { data } = await instance.post(`/auth/github`, {});
//     return data;
//   };

export const getUserDetails = async (code: string, provider: string) => {
  const { data } = await instance.post<User>(`/auth/${provider}/callback`, {
    code,
  });

  if (data["status_code"] === 200) {
    const token = data.token.split(" ")[1];
    storeDataInCookie("accessToken", token, 1);
    return {
      data,
      statusCode: data["status_code"],
    };
  }
};

export const sendUserAuthOtpMail = async (email: string) => {
  const { data } = await instance.get(`/auth/email/sign-in?email=${email}`);
  return data;
};

export const verifyUserOtp = async (email: string, otp: string) => {
  const { data } = await instance.post(`/auth/email/verify-token`, {
    email,
    token: otp,
  });
  return {
    data,
    statusCode: data["status_code"],
  };
};
