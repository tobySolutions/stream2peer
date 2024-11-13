import { AuthAccountType } from '../TypeChecking/AuthAccount';

export interface IAuthAccount {
  id?: number;
  userId: string;
  auth_provider: AuthAccountType;
  createdAt?: Date;
  updatedAt?: Date;
  identifier?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
