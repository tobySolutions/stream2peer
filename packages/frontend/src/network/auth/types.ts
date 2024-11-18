type BASE_RESPONSE = {
  status_code: number;
  status: string;
};

export type GoogleAuthUrlResponse = {
  data: {
    authUrl: string;
  };
} & BASE_RESPONSE;
