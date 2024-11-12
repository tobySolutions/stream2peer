/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtConfig } from 'Config/index';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from 'Api/Modules/Common/Exceptions/UnauthenticatedError';
import { IAuthAccount } from 'Api/Modules/Client/Authentication/TypeChecking/IAuthAccount';
import { ProjectRole } from 'Api/Modules/Client/Project/TypeChecking/ProjectRole';

type JwtPayload = {
  identifier: string;
  userId: string;
  project_identifier: string;
  role: ProjectRole;
};

type ProjectInvite = {
  userId: string;
  role: ProjectRole;
  projectId: string;
};

export class JwtHelper {
  public static signUser(user: IAuthAccount) {
    return jwt.sign(
      {
        identifier: user.identifier,
        userId: user.userId,
        authProvider: user.auth_provider,
      },
      jwtConfig.jwtSecret,
      {
        expiresIn: '2d',
        algorithm: 'HS256',
      },
    );
  }

  public static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, jwtConfig.jwtSecret, {
        algorithms: ['HS256'],
      }) as JwtPayload;
    } catch (err) {
      throw new UnauthenticatedError();
    }
  }

  public static generateInviteToken(
    invitePayload: ProjectInvite,
    expiresIn = jwtConfig.jwtExpiresIn,
  ): string {
    return jwt.sign(invitePayload, jwtConfig.jwtSecret, {
      expiresIn,
      algorithm: 'HS256',
    });
  }

  public static generateAccessToken(user: Partial<IAuthAccount>){
    return jwt.sign(
      {
        userId: user.userId,
      },
      jwtConfig.jwtSecret,
      {
        expiresIn: '2h',
        algorithm: 'HS256',
      },
    );
  }
}
