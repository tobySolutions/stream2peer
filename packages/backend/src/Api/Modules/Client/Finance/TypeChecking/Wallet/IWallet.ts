import { DateTime } from "luxon";

export interface IWallet {
  id: number;

  identifier: string;

  balance: number;

  userId: number;

  createdAt: DateTime;

  updatedAt: DateTime;
}
