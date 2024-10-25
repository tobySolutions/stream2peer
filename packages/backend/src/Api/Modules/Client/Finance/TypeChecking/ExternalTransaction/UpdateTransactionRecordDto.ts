import DbQueryRunner from "TypeChecking/QueryRunner";
import { ExternalTransactionStatusEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionStatusEnum";
import { GetExternalTransactionRecordDto } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/GetExternalTransactionRecordDto";

type UpdateExternalTransactionRecordPayload = {
  transactionStatus: ExternalTransactionStatusEnum;
};

export type UpdateExternalTransactionRecordDto = {
  identifierOptions: GetExternalTransactionRecordDto;

  updatePayload: UpdateExternalTransactionRecordPayload;

  queryRunner: DbQueryRunner;
};
