import dotenv from "dotenv";

dotenv.config();

export const authConfig = {
  googleClientId: process.env["GOOGLE_CLIENT_ID"]!,
  googleClientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
  googleRedirectUri: process.env["GOOGLE_REDIRECT_URI"]!,
  
  githubClientId: process.env["GITHUB_CLIENT_ID"]!,
  githubClientSecret: process.env["GITHUB_CLIENT_SECRET"]!,
  githubRedirectUri: process.env["GITHUB_REDIRECT_URI"]!,

  metamaskClientId: process.env["METAMASK_CLIENT_ID"]!,
  metamaskClientSecret: process.env["METAMASK_CLIENT_SECRET"]!,
  metamaskRedirectUri: process.env["METAMASK_REDIRECT_URI"]!,
};
