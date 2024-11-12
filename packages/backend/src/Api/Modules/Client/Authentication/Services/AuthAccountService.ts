import { autoInjectable } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { AuthAccount } from 'Api/Modules/Client/Authentication/Entities/AuthAccount';
import { NULL_OBJECT } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import {
  CreateAuthAccountRecordDto,
  UpdateAuthAccountRecordArgs,
} from 'Api/Modules/Client/Authentication/TypeChecking/AuthAccount';
import { AuthAccountType } from '../TypeChecking/AuthAccount';

@autoInjectable()
class AuthAccountService {
  private authAccountRepository;

  constructor(private dbContext?: DbContext) {
    this.authAccountRepository = dbContext?.getEntityRepository(
      AuthAccount,
    ) as Repository<AuthAccount>;
  }

  public async createAuthAccountRecord(
    createAuthAccountRecordArgs: CreateAuthAccountRecordDto,
  ) {
    const { userId, authProvider, queryRunner } = createAuthAccountRecordArgs;
    const newAuthAccountData = {
      userId,
      authProvider,
    };

    const authAccount = new AuthAccount();

    Object.assign(authAccount, newAuthAccountData);

    await queryRunner.manager.save(authAccount);

    return authAccount;
  }

  public async listActiveAuthAccounts(): Promise<Iterable<AuthAccount>> {
    return await this.authAccountRepository.findBy({
      isActive: true,
    });
  }

  public async getAuthAccountByUserId(
    userId: string,
  ): Promise<AuthAccount | null> {
    if (!userId) {
      console.log('Error: userId is undefined or empty.');
      return NULL_OBJECT;
    }

    const authAccount = await this.authAccountRepository.findOneBy({ userId });
    return authAccount || NULL_OBJECT;
  }

  public async getAuthAccountsByAuthProvider(
    authProvider: AuthAccountType,
  ): Promise<AuthAccount | null> {
    const authAccount = await this.authAccountRepository.findOneBy({
      auth_provider: authProvider,
    });

    return authAccount || NULL_OBJECT;
  }

  public async updateAuthAccountRecord(
    updateAuthAccountRecordArgs: UpdateAuthAccountRecordArgs,
  ) {
    const { userId, updateAuthAccountPayload } = updateAuthAccountRecordArgs;

    const authAccount = await this.getAuthAccountByUserId(userId);

    if (authAccount === NULL_OBJECT) return NULL_OBJECT;

    Object.assign(authAccount, updateAuthAccountPayload);

    await this.authAccountRepository.save(authAccount);
    return authAccount;
  }

  public async disableAuthAccountRecord(userId: string) {
    const authAccount = await this.getAuthAccountByUserId(userId);

    if (authAccount === NULL_OBJECT) return;

    authAccount.isDeleted = true;
    authAccount.isActive = false;

    await this.authAccountRepository.save(authAccount);
  }

  public async updateAuthAccountLastLoginDate(userId: string) {
    const updateAuthAccountRecordArgs: UpdateAuthAccountRecordArgs = {
      userId,
      identifierType: 'userId',
      updateAuthAccountPayload: {
        lastLoginDate: DateTime.now(),
      },
    };
    return await this.updateAuthAccountRecord(updateAuthAccountRecordArgs);
  }
}

export default new AuthAccountService();
