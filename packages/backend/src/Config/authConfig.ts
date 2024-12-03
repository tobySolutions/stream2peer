import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  googleClientId: process.env['GOOGLE_CLIENT_ID']!,
  googleClientSecret: process.env['GOOGLE_CLIENT_SECRET']!,
  googleRedirectUri: process.env['GOOGLE_REDIRECT_URI']!,

  githubClientId: process.env['GITHUB_CLIENT_ID']!,
  githubClientSecret: process.env['GITHUB_CLIENT_SECRET']!,
  githubRedirectUri: process.env['GITHUB_REDIRECT_URI']!,

  metamaskClientId: process.env['METAMASK_CLIENT_ID']!,
  metamaskClientSecret: process.env['METAMASK_CLIENT_SECRET']!,
  metamaskRedirectUri: process.env['METAMASK_REDIRECT_URI']!,

  youtubeRedirectUri: process.env['YOUTUBE_REDIRECT_URI'],
  youtubeAPIKey: process.env['YOUTUBE_API_KEY'],

  twitchClientId: process.env['TWITCH_CLIENT_ID'],
  twitchClientSecret: process.env['TWITCH_CLIENT_SECRET'],
  twitchRedirectURI: process.env['TWITCH_REDIRECT_URI'],
};
