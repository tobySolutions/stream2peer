import { InitializeTransactionDto } from "Lib/Infra/External/Payment/TypeChecking/InitializeTransactionDto";
import { VerifyTransactionDto } from "Lib/Infra/External/Payment/TypeChecking/VerifyTransactionDto";

export interface IPaymentProviderDriver {
  initializeTransaction(
    initializeTransactionDto: InitializeTransactionDto
  ): Promise<object | null>;

  verifyTransaction(
    verifyTransactionDto: VerifyTransactionDto
  ): Promise<object | null>;
}
