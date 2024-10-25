import { IPaymentProviderDriver } from "Lib/Infra/External/Payment/TypeChecking/IPaymentProviderDriver";
import { InitializeTransactionDto } from "Lib/Infra/External/Payment/TypeChecking/InitializeTransactionDto";
import { VerifyTransactionDto } from "Lib/Infra/External/Payment/TypeChecking/VerifyTransactionDto";

export class PaymentProvider {
  private driver: IPaymentProviderDriver;

  constructor(paymentDriver: IPaymentProviderDriver) {
    this.driver = paymentDriver;
  }

  public async initiateTransaction(
    initializeTransactionDto: InitializeTransactionDto
  ) {
    return this.driver.initializeTransaction(initializeTransactionDto);
  }

  public async verifyTransaction(verifyTransactionDto: VerifyTransactionDto) {
    return this.driver.verifyTransaction(verifyTransactionDto);
  }
}
