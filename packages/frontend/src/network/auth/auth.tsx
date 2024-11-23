import { storeDataInCookie } from "../../utils/utils";
import instance from "../axios";
import { GoogleAuthUrlResponse } from "./types";

const errorCodes = [400, 401, 403, 404, 500];

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
  const { data } = await instance.post(`/auth/${provider}/callback`, {
    code,
  });

  if (data["status_code"] === 200) {
    console.log(data, "200");
    const token = data.token.split(" ")[1];
    storeDataInCookie("accessToken", token, 1);
    return {
      data,
      statusCode: data["status_code"],
    };
  }
};

export const handleGoogleSignIn = async () => {
  console.log("Google sign-in clicked");
  try {
    const { data } = await generateAuthWithGoogleUrl();
    window.location.href = data.authUrl;
  } catch (error) {
    console.error(error);
  }
};

export const handleGitHubSignIn = async () => {
  console.log("GitHub sign-in clicked");
  try {
    const { data } = await generateAuthWithGithubUrl();
    console.log(data);
    window.location.href = data.authUrl;
  } catch (error) {
    console.error(error);
  }
};

export const sendUserAuthOtpMail = async (email: string) => {
  console.log(email, "request");
  const { data } = await instance.get(`/auth/email/sign-in?email=${email}`);
  console.log(data, "response");
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
