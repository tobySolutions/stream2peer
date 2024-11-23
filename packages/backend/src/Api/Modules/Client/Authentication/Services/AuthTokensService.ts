import { autoInjectable } from "tsyringe";
import { AuthTokens } from "Api/Modules/Client/Authentication/Entities/AuthTokens";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { DateTime } from "luxon";
import { businessConfig } from "Config/businessConfig";
import { Repository } from "typeorm";
import {
    CreateAuthTokenDtoType,
    CreateSignInTokenDtoType,
} from "Api/Modules/Client/Authentication/TypeChecking/AuthTokens";

@autoInjectable()
class AuthTokensService {
  private userTokenRepository;

  constructor(private dbContext?: DbContext) {
    this.userTokenRepository = dbContext?.getEntityRepository(
      AuthTokens
    ) as Repository<AuthTokens>;
  }

  /*
   * This method creates a new AuthToken Record
   *
   * @args
   * - createAuthTokenArgs: CreateAuthTokenArgs
   *
   * returns AuthToken
   */
  public async createUserTokenRecord(
    createUserTokenArgs: CreateAuthTokenDtoType
  ) {
    const { queryRunner } = createUserTokenArgs;
    const userToken = new AuthTokens();

    Object.assign(userToken, {
      ...createUserTokenArgs,
    });
    await queryRunner.manager.save(userToken);
    return userToken;
  }

  public async createEmailSignInToken(
    CreateSignInTokenDtoTypeArgs: CreateSignInTokenDtoType
  ) {
    const { email, token, queryRunner } = CreateSignInTokenDtoTypeArgs;
    const expiresOn = DateTime.now().plus({
      minute: businessConfig.signInTokenExpiresInMinutes,
    });
    const createUserTokenArgs: CreateAuthTokenDtoType = {
      email,
      token,
      expiresOn,
      queryRunner,
    };
    return await this.createUserTokenRecord(createUserTokenArgs);
  }

  public async getUserTokenByToken(token: string): Promise<AuthTokens | null> {
    const tokenInfo = await this.userTokenRepository.findOneBy({
      token,
    });
    return tokenInfo || NULL_OBJECT;
  }

  public async getUserTokenByIdentifier(tokenIdentifier: string) {
    return await this.userTokenRepository.findOneBy({
      identifier: tokenIdentifier,
    });
  }

  public async getUserTokenByEmail(userEmail: string) {
    return await this.userTokenRepository.findOneBy({email: userEmail});
  }

  public async deleteUserToken(token: string){
    return await this.userTokenRepository.delete({token})
  }

  public getEmailSignInTokenExpiresOn() {
    return DateTime.now().plus({
      minute: businessConfig.signInTokenExpiresInMinutes,
    });
  }

  public checkTokenExpired(tokenExpiration: DateTime): boolean {
    return businessConfig.currentDateTime() > tokenExpiration;
  }
}

export default new AuthTokensService();
