import { Request } from "express";
import { AuthAccount } from "Api/Modules/Client/Authentication/Entities/AuthAccount"

export type AuthRequest = Request & {
  authAccount: AuthAccount;
};
