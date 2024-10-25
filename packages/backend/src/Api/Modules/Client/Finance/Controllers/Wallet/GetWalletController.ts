import { Request, Response } from "express";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  WALLET_RESOURCE,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { AuthRequest } from "TypeChecking/GeneralPurpose/AuthRequest";
import WalletService from "Api/Modules/Client/Finance/Services/WalletService";
import { RESOURCE_FETCHED_SUCCESSFULLY } from "Api/Modules/Common/Helpers/Messages/SystemMessageFunctions";

class GetWalletDetailsController {
  public async handle(request: Request, response: Response) {
    try {
      const user = (request as AuthRequest).user;

      const wallet = await WalletService.getWalletByUserId(user.id);

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: RESOURCE_FETCHED_SUCCESSFULLY(WALLET_RESOURCE),
        results: wallet!.forClient,
      });
    } catch (GetWalletControllerError) {
      console.log(
        "🚀 ~ GetWalletController.handle GetWalletControllerError ->",
        GetWalletControllerError
      );

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new GetWalletDetailsController();
