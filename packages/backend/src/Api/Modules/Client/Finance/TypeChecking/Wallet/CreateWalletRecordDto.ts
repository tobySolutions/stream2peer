import { IWallet } from "Api/Modules/Client/Finance/TypeChecking/Wallet/IWallet";
import DbQueryRunner from "TypeChecking/QueryRunner";

export type CreateWalletRecordDto = Pick<IWallet, "userId" | "balance"> &
  DbQueryRunner;
