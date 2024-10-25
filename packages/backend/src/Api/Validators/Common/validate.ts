import { VALIDATION_ERROR } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  return res.status(422).json({
    status_code: 422,
    message: VALIDATION_ERROR,
    status: "error",
    errors: errors.array(),
  });
};
export default validate;
