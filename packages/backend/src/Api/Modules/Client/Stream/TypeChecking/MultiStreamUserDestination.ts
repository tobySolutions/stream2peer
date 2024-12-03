export enum Platform {
  Linkedin = 'Linkedin',
  Youtube = 'Youtube',
  Twitch = 'Twitch',
  Facebook = 'Facebook',
  X = 'Twitter',
  Zoom = 'Zoom',
  Instagram = 'Instagram',
}

export type Token = {
  accessToken?: string;
  refreshToken: string;
};

export type MultiStreamToken = {
  type: Platform;
  token: Token;
};

export type StreamPlatform = {
  platform: Platform;
  broadcastId: string;
};
