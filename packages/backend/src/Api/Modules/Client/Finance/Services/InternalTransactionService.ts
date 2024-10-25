import { autoInjectable } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { InternalTransaction } from "Api/Modules/Client/Finance/Entities";
import { Repository } from "typeorm";
import { CreateInternalTransactionRecordDto } from "Api/Modules/Client/Finance/TypeChecking/Transaction/CreateInternalTransactionRecordDto";

@autoInjectable()
class InternalTransactionService {
  private internalTransactionRepository;

  constructor(private dbContext?: DbContext) {
    this.internalTransactionRepository = dbContext?.getEntityRepository(
      InternalTransaction
    ) as Repository<InternalTransaction>;
  }

  public async createInternalTransactionRecord(
    createInternalTransactionRecordDto: CreateInternalTransactionRecordDto
  ) {
    const {
      queryRunner,
      transactionDescription,
      sourceWalletId,
      destinationWalletId,
      amount,
    } = createInternalTransactionRecordDto;

    const internalTransaction = new InternalTransaction();

    Object.assign(internalTransaction, {
      transactionDescription,
      sourceWalletId,
      destinationWalletId,
      amount,
    });

    await queryRunner.manager.save(internalTransaction);

    return internalTransaction;
  }
}

export default new InternalTransactionService();
