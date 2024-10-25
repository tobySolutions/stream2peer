import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";

interface ApplicationErrorArgs {
  httpStatusCode: HttpStatusCodeEnum;
  description: string;
  isOperational?: boolean;
}

export default class ApplicationError extends Error {
  public readonly description: string;
  public readonly httpCode: HttpStatusCodeEnum;
  public readonly isOperational: boolean = true;

  constructor(applicationErrorArgs: ApplicationErrorArgs) {
    super(applicationErrorArgs.description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpCode = applicationErrorArgs.httpStatusCode;

    if (applicationErrorArgs.isOperational !== undefined) {
      this.isOperational = applicationErrorArgs.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
