import { DbContext } from "Lib/Infra/Internal/DBContext";
import { ExternalTransaction } from "Api/Modules/Client/Finance/Entities/ExternalTransaction";
import { Repository } from "typeorm";
import { CreateExternalTransactionRecordDto } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/CreateExternalTransctionRecordDto";

import { businessConfig } from "Config/businessConfig";
import { NumberStringGenerator } from "Api/Modules/Common/Helpers/NumberStringGenerator";
import { UpdateExternalTransactionRecordDto } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/UpdateTransactionRecordDto";
import { GetExternalTransactionRecordDto } from "Api/Modules/Client/Finance/TypeChecking/ExternalTransaction/GetExternalTransactionRecordDto";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class ExternalTransactionService {
  private externalTransactionRepository;

  constructor(private dbContext?: DbContext) {
    this.externalTransactionRepository = dbContext?.getEntityRepository(
      ExternalTransaction
    ) as Repository<ExternalTransaction>;
  }

  public async getExternalTransactionRecord(
    getExternalTransactionRecordDto: GetExternalTransactionRecordDto
  ) {
    const { identifier, identifierType } = getExternalTransactionRecordDto;

    switch (identifierType) {
      case "identifier":
        return this.getExternalTransactionByIdentifier(identifier);

      case "id":
        return this.getExternalTransactionById(identifier);

      case "transactionReference":
        return this.getExternalTransactionByReference(identifier);

      default:
        return NULL_OBJECT;
    }
  }

  public async createExternalTransactionRecord(
    createExternalTransactionRecordDto: CreateExternalTransactionRecordDto
  ) {
    const {
      amount,
      channel,
      destinationWalletId,
      transactionDescription,
      transactionType,
      transactionStatus,
      transactionReference,
      queryRunner,
    } = createExternalTransactionRecordDto;

    const externalTransaction = new ExternalTransaction();

    Object.assign(externalTransaction, {
      amount,
      channel,
      destinationWalletId,
      transactionDescription,
      transactionType,
      transactionReference,
      transactionStatus,
    });

    await queryRunner.manager.save(externalTransaction);

    return externalTransaction;
  }

  public generateReference() {
    return NumberStringGenerator({
      characterLength: businessConfig.externalTransactionReferenceLength,
    });
  }

  public async updateExternalTransactionRecord(
    updateExternalTransactionRecordDto: UpdateExternalTransactionRecordDto
  ) {
    const { identifierOptions, updatePayload, queryRunner } =
      updateExternalTransactionRecordDto;

    const externalTransaction = await this.getExternalTransactionRecord(
      identifierOptions
    );

    if (externalTransaction === NULL_OBJECT) return;

    Object.assign(externalTransaction, updatePayload);

    await queryRunner.queryRunner.manager.save(externalTransaction);

    return externalTransaction;
  }

  public async getExternalTransactionByIdentifier(identifier: string) {
    return await this.externalTransactionRepository.findOneBy({
      identifier,
    });
  }

  public async getExternalTransactionById(externalTransactionId: number) {
    return await this.externalTransactionRepository.findOneBy({
      id: externalTransactionId,
    });
  }

  public async getExternalTransactionByReference(transactionReference: string) {
    return await this.externalTransactionRepository.findOneBy({
      transactionReference,
    });
  }
}

export default new ExternalTransactionService();
