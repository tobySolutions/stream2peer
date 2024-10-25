import DbQueryRunner from "TypeChecking/QueryRunner";
import { IExternalTransaction } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/IExternalTransaction";

export type CreateExternalTransactionRecordDto = Pick<
  IExternalTransaction,
  | "amount"
  | "channel"
  | "destinationWalletId"
  | "transactionDescription"
  | "transactionType"
  | "transactionReference"
  | "transactionStatus"
> &
  DbQueryRunner;
