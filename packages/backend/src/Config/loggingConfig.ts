export const loggingConfig = {
  LOGS: {
    level: process.env["LOG_LEVEL"]! || "silly",
  },
  LOGGING_PROVIDER: "winston",
};
