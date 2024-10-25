import winston from "winston";
import { ILoggingDriver } from "Lib/Infra/Internal/Logging/ILoggingDriver";

export class WinstonDriver implements ILoggingDriver {
  winston: winston.Logger;

  constructor() {
    const customLogFormat = winston.format.printf(
      ({ timestamp, message, level }) => {
        return `[${level.toUpperCase()}] ${timestamp} ${message}`;
      }
    );
    this.winston = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          level: "warn",
          filename: "logs/logsWarnings",
        }),
        new winston.transports.File({
          level: "error",
          filename: "logs/logsErrors",
        }),
      ],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customLogFormat
      ),
    });
  }

  info(data: string): void {
    this.winston.info(data);
  }

  error(data: string): void {
    this.winston.error(data);
  }
}
