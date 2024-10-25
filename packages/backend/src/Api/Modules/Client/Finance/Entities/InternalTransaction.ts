import { BaseEntity } from "Entities/Base";
import { Column, Entity } from "typeorm";

@Entity("internal_transaction")
export class InternalTransaction extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  sourceWalletId: number;

  @Column()
  destinationWalletId: number;

  @Column()
  transactionDescription: string;

  public get forClient() {
    return {
      identifier: this.identifier,
      amount: this.amount,
      transaction_description: this.transactionDescription,
    };
  }
}
