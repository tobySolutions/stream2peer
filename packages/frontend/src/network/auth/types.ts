import { BASE_NETWORK_RESPONSE } from "../types";

export type GoogleAuthUrlResponse = {
  data: {
    authUrl: string;
  };
} & BASE_NETWORK_RESPONSE;

export type UserData = {
  username: string;
  userId: string;
  auth_provider: string;
};

export type User = {
  token: string;
  data: UserData;
} & BASE_NETWORK_RESPONSE;
