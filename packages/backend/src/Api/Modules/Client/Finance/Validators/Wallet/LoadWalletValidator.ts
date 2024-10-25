import { body } from "express-validator";

export const LoadWalletValidator = [
  body("amount", "Amount should be a number").isNumeric(),
];
