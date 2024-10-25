import { HttpClient } from "Lib/Infra/Internal/HttpClient";
import { PostRequestDto } from "TypeChecking/GeneralPurpose/PostRequestDto";
import { GetRequestDto } from "TypeChecking/GeneralPurpose/GetRequestDto";
import { AuthAccount } from "Api/Modules/Client/Authentication/Entities/AuthAccount";
import { Repository } from "typeorm";
import { autoInjectable } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { FindOrCreateAuthAccountDto } from "Api/Modules/Client/Authentication/TypeChecking/FindOrCreateAuthAccountDto";
import { authConfig } from "Config/authConfig";

@autoInjectable()
class AuthService {
  private authAccountRepository: Repository<AuthAccount>;

  constructor(private dbContext?: DbContext) {
    this.authAccountRepository = dbContext?.getEntityRepository(AuthAccount) as Repository<AuthAccount>;
  }

  public getGoogleAuthUrl(): string {
    const clientId = authConfig.googleClientId;
    const redirectUri = authConfig.googleRedirectUri;
    const scope = "email";
    const responseType = "code";

    return `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  }

  public async getGoogleToken(code: string): Promise<string> {
    const postRequestDto: PostRequestDto = {
      url: "https://oauth2.googleapis.com/token",
      headers: { "Content-Type": "application/json" },
      body: {
        code,
        client_id: authConfig.googleClientId,
        client_secret: authConfig.googleClientSecret,
        redirect_uri: authConfig.googleRedirectUri,
        grant_type: "authorization_code",
      },
    };

    const tokenResponse = await HttpClient.post(postRequestDto);
    return tokenResponse.access_token;
  }

  public async getGoogleUserInfo(token: string) {
    const getRequestDto: GetRequestDto = {
      url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      headers: { Authorization: `Bearer ${token}` },
    };

    const userInfo = await HttpClient.get(getRequestDto);
    return userInfo;
  }

  public async findOrCreateAuthAccount(
    findOrCreateAuthAccountDto: FindOrCreateAuthAccountDto
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

export default new AuthService();
