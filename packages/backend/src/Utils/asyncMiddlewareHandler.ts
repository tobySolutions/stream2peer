import { NextFunction, Response, Request } from 'express';
import { Middleware } from 'TypeChecking/GeneralPurpose/Middleware';

export const asyncMiddlewareHandler =
  (fn: Middleware) =>
  (request: Request, response: Response, next: NextFunction) =>
    fn(request, response, next).catch(next);
