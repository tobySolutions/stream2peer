import { BaseEntity } from "Entities/Base";
import { Column, Entity } from "typeorm";
import { ExternalTransactionStatusEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionStatusEnum";
import { ExternalTransactionChannelsEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTransactionChannelsEnum";
import { ExternalTranscationTypeEnum } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/ExternalTranscationTypeEnum";

@Entity("external_transactions")
export class ExternalTransaction extends BaseEntity {
  @Column()
  amount: number;

  @Column({
    type: "enum",
    enum: ExternalTransactionChannelsEnum,
  })
  channel: ExternalTransactionChannelsEnum;

  @Column()
  destinationWalletId: number;

  @Column()
  transactionDescription: string;

  @Column({
    type: "enum",
    enum: ExternalTranscationTypeEnum,
    default: ExternalTranscationTypeEnum.FUNDING,
  })
  transactionType: ExternalTranscationTypeEnum;

  @Column()
  transactionReference: string;

  @Column({
    type: "enum",
    enum: ExternalTransactionStatusEnum,
    default: ExternalTransactionStatusEnum.PAYMENT_PENDING,
  })
  transactionStatus: ExternalTransactionStatusEnum;

  public get forClient() {
    return {
      identifier: this.identifier,
      amount: this.amount,
      transaction_description: this.transactionDescription,
    };
  }
}
