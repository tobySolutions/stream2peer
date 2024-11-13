import DbQueryRunner from 'TypeChecking/QueryRunner';
import { IAuthAccount } from 'Api/Modules/Client/Authentication/TypeChecking/IAuthAccount';

export type FindOrCreateAuthAccountDto = Pick<
  IAuthAccount,
  'auth_provider' | 'userId'
> &
  DbQueryRunner;
