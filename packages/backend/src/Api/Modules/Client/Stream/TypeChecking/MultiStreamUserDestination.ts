export enum Platform {
  Linkedin = 'Linkedin',
  Youtube = 'Youtube',
  Twitch = 'Twitch',
  Facebook = 'Facebook',
  X = 'Twitter',
}

export type Token = {
  accessToken?: string;
  refreshToken: string;
};

export type MultiStreamToken = {
  type: Platform;
  token: Token;
};
