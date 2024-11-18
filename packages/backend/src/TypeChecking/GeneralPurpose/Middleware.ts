import { Request, Response, NextFunction } from 'express';

export type Middleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<Middleware> | Promise<void>;
