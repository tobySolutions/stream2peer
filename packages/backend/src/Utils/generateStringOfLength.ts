import * as crypto from "crypto";

export function generateStringOfLength(length: number): string {
  return crypto
    .randomBytes(length)
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}
