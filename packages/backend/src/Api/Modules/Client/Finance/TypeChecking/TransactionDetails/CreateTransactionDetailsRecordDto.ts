import { ITransactionDetails } from "Api/Modules/Client/Finance/TypeChecking/TransactionDetails/ITransactionDetails";
import DbQueryRunner from "TypeChecking/QueryRunner";

export type CreateTransactionDetailsRecordDto = Pick<
  ITransactionDetails,
  "wallet" | "amount" | "transactionDescription" | "transactionType"
> &
  DbQueryRunner;
