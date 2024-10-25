import DbQueryRunner from "TypeChecking/QueryRunner";

export type ChargeWalletDto = {
  walletId: number;

  amount: number;
} & DbQueryRunner;
