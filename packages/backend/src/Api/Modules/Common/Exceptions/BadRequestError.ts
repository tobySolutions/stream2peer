import ApplicationError from "./ApplicationError";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";

export class BadRequestError extends ApplicationError {
  constructor(description = "Bad Request Error") {
    super({
      description,
      httpStatusCode: HttpStatusCodeEnum.BAD_REQUEST,
      isOperational: undefined,
    });
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
