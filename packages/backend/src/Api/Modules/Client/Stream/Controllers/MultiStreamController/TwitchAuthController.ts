import { Request, Response } from 'express';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import TwitchAuthService from 'Api/Modules/Client/Stream/Services/MultiMediaServices/TwitchService';
import {
  SUCCESS,
  ERROR,
  SOMETHING_WENT_WRONG,
  TWITCH_AUTHENTICATION_SUCCESS,
  NULL_OBJECT,
  RESOURCE_NOT_CREATED,
  AUTHORIZATION_CODE_MISSING,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import AuthAccountService from 'Api/Modules/Client/Authentication/Services/AuthAccountService';
import { AuthRequest } from 'Api/TypeChecking';
import { Platform } from '../../TypeChecking/MultiStreamUserDestination';

class TwitchAuthController {
  public async handle(request: Request, response: Response) {
    try {
      const authUrl = TwitchAuthService.getTwitchAuthUrl();
      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        data: { authUrl },
      });
    } catch (error) {
      console.log('TwitchAuthController.auth error ->', error);
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }

  public async callback(request: Request, response: Response) {
    try {
      const { code } = request.query;
      const user = (request as AuthRequest).authAccount;

      if (!code) {
        return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
          status_code: HttpStatusCodeEnum.BAD_REQUEST,
          status: ERROR,
          message: AUTHORIZATION_CODE_MISSING,
        });
      }

      const tokenData = await TwitchAuthService.exchangeCodeForTokens(
        code.toString(),
      );

      if (tokenData == NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
          status_code: HttpStatusCodeEnum.BAD_REQUEST,
          status: ERROR,
          message: RESOURCE_NOT_CREATED,
        });
      }

      const updatedAuthAccount = await AuthAccountService.updateStreamTokens(
        user.userId,
        {
          type: Platform.Twitch,
          token: {
            accessToken: tokenData.accessToken,
            refreshToken: tokenData.refreshToken,
          },
        },
      );

      if (updatedAuthAccount == NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
          status_code: HttpStatusCodeEnum.BAD_REQUEST,
          status: ERROR,
          message: RESOURCE_NOT_CREATED,
        });
      }

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: TWITCH_AUTHENTICATION_SUCCESS,
      });
    } catch (error) {
      console.log('TwitchAuthController.callback error ->', error);
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new TwitchAuthController();
