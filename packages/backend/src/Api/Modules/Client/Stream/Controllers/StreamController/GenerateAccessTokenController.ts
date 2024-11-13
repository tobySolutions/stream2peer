import { Request, Response } from 'express';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import { JwtHelper } from 'Api/Modules/Common/Helpers/JwtHelper';
import { SUCCESS, ERROR, SOMETHING_WENT_WRONG, TOKEN_GENERATION_SUCCESS } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { AuthRequest } from 'TypeChecking/GeneralPurpose/AuthRequest';

class GenerateAccessTokenController {
  public async handle(request: Request, response: Response) {
    try {
      const user = (request as AuthRequest).authAccount;
      const jwtToken = JwtHelper.generateAccessToken(user);

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: TOKEN_GENERATION_SUCCESS,
        access_token: jwtToken,
      });
    } catch (error) {
      console.log('AccessTokenController.generateAccessToken error ->', error);
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new GenerateAccessTokenController();
