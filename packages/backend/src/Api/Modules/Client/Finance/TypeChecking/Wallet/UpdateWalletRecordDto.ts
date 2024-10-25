import DbQueryRunner from "TypeChecking/QueryRunner";

type UpdateWalletRecordDtoPayload = {
  balance: number;
};

export type UpdateWalletRecordDto = {
  identifier: string | number;

  identifierType: "id" | "identifier" | "userId";

  updatePayload: UpdateWalletRecordDtoPayload;
} & DbQueryRunner;
