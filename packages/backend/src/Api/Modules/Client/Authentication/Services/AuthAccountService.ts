import { autoInjectable } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { AuthAccount } from 'Api/Modules/Client/Authentication/Entities/AuthAccount';
import { NULL_OBJECT } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { Repository } from 'typeorm';
import {
  CreateAuthAccountRecordDto,
  UpdateAuthAccountRecordArgs,
} from 'Api/Modules/Client/Authentication/TypeChecking/AuthAccount';
import { AuthAccountType } from '../TypeChecking/AuthAccount';
import { GetRequestDto } from 'TypeChecking/GeneralPurpose/GetRequestDto';
import { HttpClient } from 'Lib/Infra/Internal/HttpClient';
import _ from 'lodash';
import { MultiStreamToken } from '../../Stream/TypeChecking/MultiStreamUserDestination';

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
    const username = await this.getAnimeUsername();
    const newAuthAccountData = {
      userId,
      username,
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

  public async getNotificationByIdentifier(
    user: AuthAccount,
    notificationId: string,
  ) {
    const notification = user.notifications.find(
      (notification) => notification.identifier == notificationId,
    );
    return notification;
  }

  public async getAnimeUsername(): Promise<string> {
    const getRequestDto: GetRequestDto = {
      url: 'https://api.jikan.moe/v4/random/characters',
    };

    const responseData = await HttpClient.get(getRequestDto);
    const username = _.join(responseData.data.name.split(' '), '-');

    return username;
  }

  public async updateStreamTokens(
    userId: string,
    newStreamToken: MultiStreamToken,
  ) {
    const authAccount = await this.getAuthAccountByUserId(userId);

    if (authAccount === NULL_OBJECT) return NULL_OBJECT;

    const existingStreamTokens = authAccount.stream_tokens || [];

    const platformIndex = existingStreamTokens.findIndex(
      (token) => token.type === newStreamToken.type,
    );

    if (platformIndex > -1) {
      existingStreamTokens[platformIndex] = newStreamToken;
    } else {
      existingStreamTokens.push(newStreamToken);
    }

    authAccount.stream_tokens = existingStreamTokens;

    await this.authAccountRepository.save(authAccount);
    return authAccount;
  }
}

export default new AuthAccountService();
