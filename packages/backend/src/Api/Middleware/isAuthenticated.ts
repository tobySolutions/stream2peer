import { NextFunction, Request, Response } from "express";
import AuthAccountService from "Api/Modules/Client/Authentication/Services/AuthAccountService";
import { JwtHelper } from "Api/Modules/Common/Helpers/JwtHelper";
import { AuthRequest } from "../TypeChecking";
import { UnauthenticatedError } from "Api/Modules/Common/Exceptions/UnauthenticatedError";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";

export const authenticateUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const token = request.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    return next(new UnauthenticatedError());
  }

  try {
    const decoded = JwtHelper.verifyToken(token);
    const { userId } = decoded;
    
    const authAccount = await AuthAccountService.getAuthAccountByUserId(userId);
    if (authAccount === NULL_OBJECT) {
      return next(new UnauthenticatedError());
    }

    (request as AuthRequest).authAccount = authAccount;

    return next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return next(new UnauthenticatedError());
  }
};
