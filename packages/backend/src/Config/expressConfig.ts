import { toArray } from "lodash";

export const expressConfig = {
  env: process.env["EXPRESS_NODE_ENV"]!,
  port: parseInt(process.env["EXPRESS_PORT"]!, 10) || 8000,
  corsWhitelist: toArray(process.env["EXPRESS_CORS_WHITELIST"]!),
};
