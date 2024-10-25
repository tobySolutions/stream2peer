import { NextFunction, Response, Request } from "express";
import { Middleware } from "TypeChecking/GeneralPurpose/Middleware";

export const asyncMiddlewareHandler =
  (fn: Middleware) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
