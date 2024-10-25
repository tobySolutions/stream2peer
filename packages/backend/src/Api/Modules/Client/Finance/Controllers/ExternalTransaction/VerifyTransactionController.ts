import { Request, Response } from "express";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  ERROR,
  NULL_OBJECT,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { container } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { PaymentProviderFactory } from "Lib/Infra/External/Payment/PaymentProviderFactory";
import * as console from "console";
import {
  OPERATION_FAILURE,
  OPERATION_SUCCESS,
  RESOURCE_RECORD_NOT_FOUND,
} from "Api/Modules/Common/Helpers/Messages/SystemMessageFunctions";
import ExternalTransactionService from "Api/Modules/Client/Finance/Services/ExternalTransactionService";
import { ExternalTransactionStatusEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionStatusEnum";

const dbContext = container.resolve(DbContext);

class VerifyTransactionController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();

    await queryRunner.startTransaction();

    try {
      const { transactionReference } = request.params;

      const externalTransaction =
        await ExternalTransactionService.getExternalTransactionByReference(
          transactionReference
        );

      if (externalTransaction === NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.NOT_FOUND).json({
          status_code: HttpStatusCodeEnum.NOT_FOUND,
          status: ERROR,
          message: RESOURCE_RECORD_NOT_FOUND("External Transaction"),
        });
      }

      const paymentProvider = PaymentProviderFactory.getPaymentProvider();

      const paymentProviderResponse = await paymentProvider.verifyTransaction({
        transactionReference,
      });

      if (paymentProviderResponse === NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
          status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
          status: ERROR,
          message: OPERATION_FAILURE("VERIFY TRANSACTION"),
        });
      }

      const IS_NOT_SUCCESS = false;

      const transactionStatusIsSuccess =
        (paymentProviderResponse as any).status === "success";

      if (transactionStatusIsSuccess === IS_NOT_SUCCESS) {
        return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
          status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
          status: ERROR,
          message: OPERATION_FAILURE("VERIFY TRANSACTION"),
        });
      }

      await ExternalTransactionService.updateExternalTransactionRecord({
        identifierOptions: {
          identifier: transactionReference,
          identifierType: "transactionReference",
        },
        queryRunner: {
          queryRunner,
        },
        updatePayload: {
          transactionStatus: ExternalTransactionStatusEnum.PAYMENT_SUCCESS,
        },
      });

      await queryRunner.commitTransaction();

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: OPERATION_SUCCESS("VERIFY TRANSACTION"),
      });
    } catch (VerifyTransactionControllerError) {
      console.log(
        "🚀 ~ VerifyTransactionController.handle VerifyTransactionControllerError ->",
        VerifyTransactionControllerError
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

export default new VerifyTransactionController();
