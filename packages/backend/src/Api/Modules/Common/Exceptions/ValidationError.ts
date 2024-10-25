import ApplicationError from "./ApplicationError";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";

export class ValidationError extends ApplicationError {
  constructor(description = "Validation Error") {
    super({
      description,
      httpStatusCode: HttpStatusCodeEnum.UNPROCESSABLE_ENTITY,
      isOperational: undefined,
    });
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
