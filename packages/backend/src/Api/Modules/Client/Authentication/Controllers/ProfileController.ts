import { Request, Response } from 'express';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import {
  SUCCESS,
  ERROR,
  SOMETHING_WENT_WRONG,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import AuthAccountService from '../Services/AuthAccountService';
import { AuthRequest } from 'Api/TypeChecking';

class ProfileController {
  public async handle(request: Request, response: Response) {
    try {
        const user = (request as AuthRequest).authAccount;

        const userProfile = await AuthAccountService.getAuthAccountByUserId(user.userId);

        if (!userProfile) {
            return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
            status_code: HttpStatusCodeEnum.BAD_REQUEST,
            status: ERROR,
            message: 'User Account Not Found',
            });
        }

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        data: userProfile.getProfile,
      });
    } catch (error) {
      console.log('ProfileController.handle error ->', error);
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }

}

export default new ProfileController();
