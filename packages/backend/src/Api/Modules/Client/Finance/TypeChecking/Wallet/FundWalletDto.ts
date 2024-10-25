import DbQueryRunner from "TypeChecking/QueryRunner";

export type FundWalletDto = {
  walletId: number;

  amount: number;
} & DbQueryRunner;
