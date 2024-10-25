import { IInternalTransaction } from "Api/Modules/Client/Finance/TypeChecking/Transaction/IInternalTransaction";
import DbQueryRunner from "TypeChecking/QueryRunner";

export type CreateInternalTransactionRecordDto = Pick<
  IInternalTransaction,
  "sourceWalletId" | "destinationWalletId" | "transactionDescription" | "amount"
> &
  DbQueryRunner;
