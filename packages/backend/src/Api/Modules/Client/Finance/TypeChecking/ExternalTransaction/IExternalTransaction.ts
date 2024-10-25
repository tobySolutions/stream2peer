import { ExternalTransactionChannelsEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionChannelsEnum";
import { ExternalTranscationTypeEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTranscationTypeEnum";
import { ExternalTransactionStatusEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionStatusEnum";
import { DateTime } from "luxon";

export interface IExternalTransaction {
  id: number;

  identifier: string;

  amount: number;

  channel: ExternalTransactionChannelsEnum;

  destinationWalletId: number;

  transactionDescription: string;

  transactionType: ExternalTranscationTypeEnum;

  transactionReference: string;

  transactionStatus: ExternalTransactionStatusEnum;

  createdAt: DateTime;

  updatedAt: DateTime;

  isActive: boolean;

  isDeleted: boolean;
}
