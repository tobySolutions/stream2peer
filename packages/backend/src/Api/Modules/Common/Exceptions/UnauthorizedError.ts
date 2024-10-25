import ApplicationError from "./ApplicationError";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";

export class UnauthorizedError extends ApplicationError {
  constructor(
    description = "You are not authorized to perform this operation"
  ) {
    super({
      description,
      httpStatusCode: HttpStatusCodeEnum.FORBIDDEN,
      isOperational: undefined,
    });
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
