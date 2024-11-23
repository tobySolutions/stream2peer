import { DateTime } from "luxon";
import DbQueryRunner from "TypeChecking/QueryRunner";

export type CreateAuthTokenDtoType = {
  email: string;
  token: string;
  expiresOn: DateTime;
} & DbQueryRunner;

export type CreateSignInTokenDtoType = {
    email: string;
    token: string;
  } & DbQueryRunner;