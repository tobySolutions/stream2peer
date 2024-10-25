export type GetExternalTransactionRecordDto =
  | {
      identifier: number;

      identifierType: "id";
    }
  | {
      identifier: string;

      identifierType: "identifier" | "transactionReference";
    };
