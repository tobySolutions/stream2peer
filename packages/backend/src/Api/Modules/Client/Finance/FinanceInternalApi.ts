import WalletService from "Api/Modules/Client/Finance/Services/WalletService";
import { CreateWalletRecordDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/CreateWalletRecordDto";
import { CreateInternalTransactionRecordDto } from "Api/Modules/Client/Finance/TypeChecking/Transaction/CreateInternalTransactionRecordDto";
import InternalTransactionService from "Api/Modules/Client/Finance/Services/InternalTransactionService";
import { ChargeWalletDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/ChargeWalletDto";
import { FundWalletDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/FundWalletDto";
import { CreateTransactionDetailsRecordDto } from "Api/Modules/Client/Finance/TypeChecking/TransactionDetails/CreateTransactionDetailsRecordDto";
import TransactionDetailsService from "Api/Modules/Client/Finance/Services/TransactionDetailsService";

export class FinanceInternalApi {
  public static async createWalletRecord(
    createWalletRecordDto: CreateWalletRecordDto
  ) {
    return await WalletService.createWalletRecord(createWalletRecordDto);
  }

  public static async createInternalTransactionRecord(
    createInternalTransactionRecordDto: CreateInternalTransactionRecordDto
  ) {
    return await InternalTransactionService.createInternalTransactionRecord(
      createInternalTransactionRecordDto
    );
  }

  public static async createTransactionDetailsRecord(
    createTransactionDetailsRecord: CreateTransactionDetailsRecordDto
  ) {
    return await TransactionDetailsService.createTransactionDetailsRecordDto(
      createTransactionDetailsRecord
    );
  }

  public static async chargeWallet(chargeWalletDto: ChargeWalletDto) {
    return await WalletService.chargeWallet(chargeWalletDto);
  }

  public static async fundWallet(fundWalletDto: FundWalletDto) {
    return await WalletService.fundWallet(fundWalletDto);
  }

  public static async getWalletByUserId(userId: number) {
    return WalletService.getWalletByUserId(userId);
  }
}
