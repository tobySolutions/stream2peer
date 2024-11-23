import DbQueryRunner from 'TypeChecking/QueryRunner';
import { AuthAccount } from '../Entities/AuthAccount';

export enum AuthAccountType {
  GOOGLE = 'google',
  GITHUB = 'github',
  METAMASK = 'metamask',
  EMAIL = 'email'
}

export type CreateAuthAccountRecordDto = {
  userId: string;
  auth_provider: string;
  auth_providerId?: string;
} & DbQueryRunner;

export type UpdateAuthAccountRecordArgs = {
  identifierType: 'id' | 'identifier' | 'userId';
  userId: string;
  updateAuthAccountPayload: Partial<AuthAccount>;
};
