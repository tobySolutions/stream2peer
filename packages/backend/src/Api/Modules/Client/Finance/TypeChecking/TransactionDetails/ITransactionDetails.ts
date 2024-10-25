import { TransactionTypesEnum } from "Api/Modules/Client/Finance/TypeChecking/Transaction/TransactionTypesEnum";
import { Wallet } from "Api/Modules/Client/Finance/Entities";

export interface ITransactionDetails {
  id: number;

  identifier: string;

  wallet: Wallet;

  walletId?: number;

  transactionType: TransactionTypesEnum;

  amount: number;

  transactionDescription: string;
}
