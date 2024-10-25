import { BaseEntity } from "Entities/Base";
import { Column, Entity, OneToMany } from "typeorm";
import { TransactionDetails } from "Api/Modules/Client/Finance/Entities/TransactionDetails";

@Entity("wallets")
export class Wallet extends BaseEntity {
  @Column()
  userId: number;

  @Column()
  balance: number;

  @OneToMany(
    () => TransactionDetails,
    (transactionDetails) => transactionDetails.wallet
  )
  transactions: TransactionDetails[];

  public get forClient() {
    return {
      identifier: this.identifier,
      balance: this.balance,
    };
  }
}
