export interface IInternalTransaction {
  id: number;

  identifier: string;

  amount: number;

  sourceWalletId: number;

  destinationWalletId: number;

  transactionDescription: string;
}
