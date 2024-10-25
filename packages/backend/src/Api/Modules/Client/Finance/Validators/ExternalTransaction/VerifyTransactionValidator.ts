import { param } from "express-validator";

export const VerifyTransactionValidator = [
  param(
    "transactionReference",
    "Transaction Reference should be a string"
  ).isString(),
];
