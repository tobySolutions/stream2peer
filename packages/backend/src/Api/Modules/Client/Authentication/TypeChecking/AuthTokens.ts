import DbQueryRunner from "TypeChecking/QueryRunner";

export type CreateAuthTokenDtoType = {
  email: string;
  token: string;
  expiresOn: Date;
} & DbQueryRunner;

export type CreateSignInTokenDtoType = {
    email: string;
    token: string;
  } & DbQueryRunner;