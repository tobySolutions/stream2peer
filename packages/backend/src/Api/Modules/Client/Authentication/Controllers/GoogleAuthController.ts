import { Request, Response } from 'express';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import GoogleAuthService from 'Api/Modules/Client/Authentication/Services/GoogleAuthService';
import {
  SUCCESS,
  ERROR,
  SOMETHING_WENT_WRONG,
  GOOGLE_AUTHENTICATION_SUCCESS,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { AuthAccountType } from 'Api/Modules/Client/Authentication/TypeChecking/AuthAccount';
import { container } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { JwtHelper } from 'Api/Modules/Common/Helpers/JwtHelper';

const dbContext = container.resolve(DbContext);

class GoogleAuthController {
  public async handle(request: Request, response: Response) {
    try {
      const googleAuthUrl = GoogleAuthService.getGoogleAuthUrl();
      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        data: { authUrl: googleAuthUrl },
      });
    } catch (error) {
      console.log('GoogleAuthController.handle error ->', error);
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }

  public async callback(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { code } = request.query;

      if (!code) {
        return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
          status_code: HttpStatusCodeEnum.BAD_REQUEST,
          status: ERROR,
          message: 'Authorization code is missing',
        });
      }

      const token = await GoogleAuthService.getGoogleToken(code.toString());
      const userInfo = await GoogleAuthService.getGoogleUserInfo(token);

      const googleAuthAccount = await GoogleAuthService.findOrCreateAuthAccount(
        {
          userId: userInfo.email,
          auth_provider: AuthAccountType.GOOGLE,
          queryRunner,
        },
      );

      if (!googleAuthAccount) {
        await queryRunner.rollbackTransaction();
        return response.status(HttpStatusCodeEnum.NOT_FOUND).json({
          status_code: HttpStatusCodeEnum.NOT_FOUND,
          status: ERROR,
          message: 'GOOGLE_AUTH_ACCOUNT_NOT_FOUND',
        });
      }

      const jwtToken = JwtHelper.signUser({
        userId: googleAuthAccount.userId,
        identifier: googleAuthAccount.identifier,
        auth_provider: AuthAccountType.METAMASK,
      });

      await queryRunner.commitTransaction();

      return response
        .setHeader('Authorization', `Bearer ${jwtToken}`)
        .status(HttpStatusCodeEnum.OK)
        .json({
          status_code: HttpStatusCodeEnum.OK,
          status: SUCCESS,
          message: GOOGLE_AUTHENTICATION_SUCCESS,
        });
    } catch (error) {
      console.log('GoogleAuthController.callback error ->', error);
      await queryRunner.rollbackTransaction();
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new GoogleAuthController();
