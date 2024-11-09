import { Request, Response, NextFunction } from 'express';
import { JwtHelper } from 'Api/Modules/Common/Helpers/JwtHelper';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import {
  ERROR,
  INVITATION_EXPIRED,
  INVALID_TOKEN,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';

export const validateProjectToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.query['token'];

  if (!token) {
    return res.status(HttpStatusCodeEnum.BAD_REQUEST).json({
      status_code: HttpStatusCodeEnum.BAD_REQUEST,
      status: ERROR,
      message: 'Project token is required',
    });
  }

  try {
    const decodedToken = JwtHelper.verifyToken(token.toString());

    const { project_identifier, role } = decodedToken;

    req.body.project_identifier = project_identifier;
    req.body.role = role;

    return next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HttpStatusCodeEnum.INVITATION_EXPIRED).json({
        status_code: HttpStatusCodeEnum.INVITATION_EXPIRED,
        status: ERROR,
        message: INVITATION_EXPIRED,
      });
    }

    return res.status(HttpStatusCodeEnum.FORBIDDEN).json({
      status_code: HttpStatusCodeEnum.FORBIDDEN,
      status: ERROR,
      message: INVALID_TOKEN,
    });
  }
};
