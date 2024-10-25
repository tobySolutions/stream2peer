import { Request } from "express";
// import { User } from "Api/Modules/Client/OnboardingAndAuthentication/Entities/User";
import { AuthAccount } from "Api/Modules/Client/Authentication/Entities/AuthAccount"

export type AuthRequest = Request & {
  // user?: User; //include second user auth-type
  authAccount: AuthAccount;
};
