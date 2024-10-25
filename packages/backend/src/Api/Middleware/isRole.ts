import { NextFunction, Request, Response } from "express";
import AuthService from "Api/Modules/Client/Authentication/Services/AuthAccountService";
// import SettingsUserRoleService from "Api/Modules/Client/OnboardingAndAuthentication/Services/SettingsUserRoleService";
import { JwtHelper } from "Api/Modules/Common/Helpers/JwtHelper";
import { AuthRequest } from "../TypeChecking";
// import { UnauthorizedError } from "Api/Modules/Common/Exceptions/UnauthorizedError";
import { UnauthenticatedError } from "Api/Modules/Common/Exceptions/UnauthenticatedError";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";

export const isRole =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (roles: string[]) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const token = await request.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new UnauthenticatedError();

    const decoded = JwtHelper.verifyToken(token);

    const { user_id } = decoded;

    const user = await AuthService.getAuthAccountByUserId(user_id);

    if (user === NULL_OBJECT) throw new UnauthenticatedError();

    // const role = await SettingsUserRoleService.getUserRoleById(user.userId);

    // if (role === NULL_OBJECT) throw new UnauthorizedError();

    // const IS_NOT_MEMBER = false;

    // const isMember = roles.includes(role.name);

    // if (isMember === IS_NOT_MEMBER) throw new UnauthorizedError();

    (request as AuthRequest).authAccount = user;

    return next();
  };
