import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "Entities/Base";
import { Wallet } from "Api/Modules/Client/Finance/Entities/Wallet";
import { TransactionTypesEnum } from "Api/Modules/Client/Finance/TypeChecking/Transaction/TransactionTypesEnum";

@Entity("transaction_details")
export class TransactionDetails extends BaseEntity {
  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet: Wallet;

  @Column({
    nullable: true,
  })
  walletId: number;

  @Column({
    type: "enum",
    enum: TransactionTypesEnum,
  })
  transactionType: TransactionTypesEnum;

  @Column({
    type: "float",
  })
  amount: number;

  @Column()
  transactionDescription: string;
}
