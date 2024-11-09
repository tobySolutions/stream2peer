import { HttpClient } from 'Lib/Infra/Internal/HttpClient';
import { PostRequestDto } from 'TypeChecking/GeneralPurpose/PostRequestDto';
import { GetRequestDto } from 'TypeChecking/GeneralPurpose/GetRequestDto';
import { AuthAccount } from 'Api/Modules/Client/Authentication/Entities/AuthAccount';
import { Repository } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { FindOrCreateAuthAccountDto } from 'Api/Modules/Client/Authentication/TypeChecking/FindOrCreateAuthAccountDto';
import { authConfig } from 'Config/authConfig';

@autoInjectable()
class GitHubAuthService {
  private authAccountRepository: Repository<AuthAccount>;

  constructor(private dbContext?: DbContext) {
    this.authAccountRepository = dbContext?.getEntityRepository(
      AuthAccount,
    ) as Repository<AuthAccount>;
  }

  public getGitHubAuthUrl(): string {
    const clientId = authConfig.githubClientId;
    const redirectUri = authConfig.githubRedirectUri;
    const scope = 'user:email';

    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }

  public async getGitHubToken(code: string): Promise<string> {
    const postRequestDto: PostRequestDto = {
      url: 'https://github.com/login/oauth/access_token',
      headers: { Accept: 'application/json' },
      body: {
        client_id: authConfig.githubClientId,
        client_secret: authConfig.githubClientSecret,
        code,
      },
    };

    const tokenResponse = await HttpClient.post(postRequestDto);
    return tokenResponse.access_token;
  }

  public async getGitHubUserInfo(token: string) {
    const getRequestDto: GetRequestDto = {
      url: 'https://api.github.com/user',
      headers: { Authorization: `Bearer ${token}` },
    };

    const userInfo = await HttpClient.get(getRequestDto);
    return userInfo;
  }

  public async findOrCreateAuthAccount(
    findOrCreateAuthAccountDto: FindOrCreateAuthAccountDto,
  ) {
    const { auth_provider, userId, queryRunner } = findOrCreateAuthAccountDto;

    let authAccount = await queryRunner.manager.findOne(AuthAccount, {
      where: { userId },
    });

    if (!authAccount) {
      authAccount = new AuthAccount();
      Object.assign(authAccount, {
        auth_provider,
        userId,
      });

      await queryRunner.manager.save(authAccount);
    }
    return authAccount;
  }
}

export default new GitHubAuthService();
