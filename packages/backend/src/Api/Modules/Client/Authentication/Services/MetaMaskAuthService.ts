import { Repository, QueryRunner } from 'typeorm';
import { ethers } from 'ethers';
import { AuthAccount } from 'Api/Modules/Client/Authentication/Entities/AuthAccount';
import { autoInjectable } from 'tsyringe';
import { AuthAccountType } from 'Api/Modules/Client/Authentication/TypeChecking/AuthAccount';
import { FindOrCreateAuthAccountDto } from 'Api/Modules/Client/Authentication/TypeChecking/FindOrCreateAuthAccountDto';

@autoInjectable()
class MetaMaskAuthService {
  public async findOrCreateAuthAccount(
    findOrCreateAuthAccountDto: FindOrCreateAuthAccountDto,
  ) {
    const { auth_provider, userId, queryRunner } = findOrCreateAuthAccountDto;

    const user_id = JSON.parse(userId);

    const authAccountRepository: Repository<AuthAccount> =
      queryRunner.manager.getRepository(AuthAccount);

    const users = await authAccountRepository.find({
      where: { auth_provider },
    });

    let user = users.find((account) => {
      const parsedUser = JSON.parse(account.userId);
      return parsedUser.address.toLowerCase() === user_id.address.toLowerCase();
    });

    const nonce = Math.floor(Math.random() * 10000000);
    if (user) {
      user.userId = JSON.stringify({ address: user_id.address, nonce });
      await authAccountRepository.save(user);
    } else {
      user = new AuthAccount();
      user.userId = JSON.stringify({ address: user_id.address, nonce });
      user.auth_provider = auth_provider;
      await authAccountRepository.save(user);
    }

    return user;
  }

  public async verifySignature(
    address: string,
    signature: string,
    queryRunner: QueryRunner,
  ) {
    const authAccountRepository: Repository<AuthAccount> =
      queryRunner.manager.getRepository(AuthAccount);

    const users = await authAccountRepository.find({
      where: { auth_provider: AuthAccountType.METAMASK },
    });

    const user = users.find((account) => {
      const parsedUser = JSON.parse(account.userId);
      return parsedUser.address.toLowerCase() === address.toLowerCase();
    });

    if (!user) {
      return false;
    }

    const parsedUser = JSON.parse(user.userId);
    const decodedAddress = ethers.verifyMessage(
      parsedUser.nonce.toString(),
      signature,
    );

    return decodedAddress.toLowerCase() === address.toLowerCase();
  }
}

export default new MetaMaskAuthService();
