import DbQueryRunner from 'TypeChecking/QueryRunner';
import { AuthAccount } from '../Entities/AuthAccount';

export enum AuthAccountType {
  GOOGLE = 'google',
  GITHUB = 'github',
  METAMASK = 'metamask',
}

export type CreateAuthAccountRecordDto = {
  userId: number;
  authProvider: string;
  authProviderId: string;
} & DbQueryRunner;

export type UpdateAuthAccountRecordArgs = {
  identifierType: 'id' | 'identifier' | 'userId';
  userId: string;
  updateAuthAccountPayload: Partial<AuthAccount>;
};
