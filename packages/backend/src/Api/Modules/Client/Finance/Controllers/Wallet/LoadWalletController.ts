import { Request, Response } from "express";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  ERROR,
  NULL_OBJECT,
  PLEASE_ACTIVATE_ACCOUNT_TO_COMPLETE_ORDER,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { PaymentProviderFactory } from "Lib/Infra/External/Payment/PaymentProviderFactory";
import { AuthRequest } from "TypeChecking/GeneralPurpose/AuthRequest";
import { FinanceInternalApi } from "Api/Modules/Client/Finance/FinanceInternalApi";
import {
  OPERATION_SUCCESS,
  WALLET_FUNDING_FROM_EXTERNAL_SOURCE_DESCRIPTION,
} from "Api/Modules/Common/Helpers/Messages/SystemMessageFunctions";
import { container } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import ExternalTransactionService from "Api/Modules/Client/Finance/Services/ExternalTransactionService";
import { ExternalTransactionStatusEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionStatusEnum";
import { ExternalTransactionChannelsEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionChannelsEnum";
import { ExternalTranscationTypeEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTranscationTypeEnum";

const dbContext = container.resolve(DbContext);

class LoadWalletController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();

    await queryRunner.startTransaction();

    try {
      const user = (request as AuthRequest).user;

      const { amount } = request.body;

      const amountToKobo = amount * 100;

      const wallet = await FinanceInternalApi.getWalletByUserId(user.id);

      if (wallet == NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
          status_code: HttpStatusCodeEnum.BAD_REQUEST,
          status: ERROR,
          message: PLEASE_ACTIVATE_ACCOUNT_TO_COMPLETE_ORDER,
        });
      }

      const transactionReference =
        ExternalTransactionService.generateReference();

      const paymentProvider = PaymentProviderFactory.getPaymentProvider();

      const paymentProviderResponse = await paymentProvider.initiateTransaction(
        {
          email: user.email,
          amount: amountToKobo,
          transactionReference,
        }
      );

      await ExternalTransactionService.createExternalTransactionRecord({
        amount: amountToKobo,
        transactionStatus: ExternalTransactionStatusEnum.PAYMENT_PENDING,
        channel: ExternalTransactionChannelsEnum.PAYSTACK,
        destinationWalletId: wallet.id,
        transactionType: ExternalTranscationTypeEnum.FUNDING,
        transactionDescription: WALLET_FUNDING_FROM_EXTERNAL_SOURCE_DESCRIPTION(
          {
            sourceChannel: ExternalTransactionChannelsEnum.PAYSTACK,
            amount: amountToKobo,
          }
        ),
        transactionReference,
        queryRunner,
      });

      await queryRunner.commitTransaction();

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: OPERATION_SUCCESS("Initialize Transaction"),
        results: paymentProviderResponse,
      });
    } catch (InitiateTransactionForOrderControllerError) {
      console.log(
        "🚀 ~ InitiateTransactionForOrderController.handle InitiateTransactionForOrderControllerError ->",
        InitiateTransactionForOrderControllerError
      );

      await queryRunner.rollbackTransaction();

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new LoadWalletController();
