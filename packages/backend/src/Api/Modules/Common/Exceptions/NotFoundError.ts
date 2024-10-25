import ApplicationError from "Api/Modules/Common/Exceptions/ApplicationError";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";

export class NotFoundError extends ApplicationError {
  constructor(description = "Not found Error") {
    super({
      description,
      httpStatusCode: HttpStatusCodeEnum.NOT_FOUND,
      isOperational: undefined,
    });
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
