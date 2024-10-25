import { autoInjectable } from "tsyringe";
import { CreateWalletRecordDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/CreateWalletRecordDto";
import { Wallet } from "Api/Modules/Client/Finance/Entities";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { Repository } from "typeorm";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { GetWalletBalanceDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/GetWalletBalanceDto";
import { UpdateWalletRecordDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/UpdateWalletRecordDto";
import { FundWalletDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/FundWalletDto";
import { ChargeWalletDto } from "Api/Modules/Client/Finance/TypeChecking/Wallet/ChargeWalletDto";

@autoInjectable()
class WalletService {
  private walletRepository;

  constructor(private dbContext?: DbContext) {
    this.walletRepository = dbContext?.getEntityRepository(
      Wallet
    ) as Repository<Wallet>;
  }

  public async createWalletRecord(
    createWalletRecordDto: CreateWalletRecordDto
  ) {
    const { queryRunner, balance, userId } = createWalletRecordDto;

    const wallet = new Wallet();

    Object.assign(wallet, {
      balance,
      userId,
    });

    await queryRunner.manager.save(wallet);

    return wallet;
  }

  public async getWalletById(walletId: number) {
    const wallet = await this.walletRepository.findOneBy({
      id: walletId,
    });

    return wallet || NULL_OBJECT;
  }

  public async getWalletByUserId(userId: number) {
    const wallet = await this.walletRepository.findOneBy({
      userId,
    });

    return wallet || NULL_OBJECT;
  }

  public async getWalletByIdentifier(identifier: string) {
    const wallet = await this.walletRepository.findOneBy({
      identifier,
    });

    return wallet || NULL_OBJECT;
  }

  public async getWalletBalance(getWalletBalanceDto: GetWalletBalanceDto) {
    const { identifier, identifierType } = getWalletBalanceDto;
    let wallet: Wallet | null;

    switch (identifierType) {
      case "identifier":
        wallet = await this.getWalletByIdentifier(identifier as string);
        break;

      case "id":
        wallet = await this.getWalletById(identifier as number);
        break;

      case "userId":
        wallet = await this.getWalletByUserId(identifier as number);
        break;
    }

    return wallet!.balance;
  }

  public async fundWallet(fundWalletDto: FundWalletDto) {
    const { walletId, amount, queryRunner } = fundWalletDto;

    const wallet = await this.getWalletById(walletId);

    const newWalletBalance = wallet!.balance + amount;

    return await this.updateWalletRecord({
      identifier: walletId,
      identifierType: "id",
      updatePayload: {
        balance: newWalletBalance,
      },
      queryRunner,
    });
  }

  public async chargeWallet(chargeWalletDto: ChargeWalletDto) {
    const { walletId, amount, queryRunner } = chargeWalletDto;

    const wallet = await this.getWalletById(walletId);

    const newWalletBalance = wallet!.balance - amount;

    return await this.updateWalletRecord({
      identifier: walletId,
      identifierType: "id",
      updatePayload: {
        balance: newWalletBalance,
      },
      queryRunner,
    });
  }

  public async updateWalletRecord(updateWalletRecord: UpdateWalletRecordDto) {
    const { identifier, identifierType, updatePayload } = updateWalletRecord;

    const wallet =
      identifierType === "id"
        ? await this.getWalletById(Number(identifier))
        : await this.getWalletByIdentifier(String(identifier));

    if (wallet === NULL_OBJECT) return;

    Object.assign(wallet, updatePayload);

    await this.walletRepository.save(wallet);

    return wallet;
  }
}

export default new WalletService();
