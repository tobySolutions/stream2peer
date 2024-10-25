import { autoInjectable } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { TransactionDetails } from "Api/Modules/Client/Finance/Entities";
import { Repository } from "typeorm";
import { CreateTransactionDetailsRecordDto } from "Api/Modules/Client/Finance/TypeChecking/TransactionDetails/CreateTransactionDetailsRecordDto";

@autoInjectable()
class TransactionDetailsService {
  private transactionDetailsRepository;

  constructor(private dbContext?: DbContext) {
    this.transactionDetailsRepository = dbContext?.getEntityRepository(
      TransactionDetails
    ) as Repository<TransactionDetails>;
  }

  public async createTransactionDetailsRecordDto(
    createTransactionDetailsRecord: CreateTransactionDetailsRecordDto
  ) {
    const {
      queryRunner,
      transactionDescription,
      transactionType,
      amount,
      wallet,
    } = createTransactionDetailsRecord;

    const transactionDetails = new TransactionDetails();

    Object.assign(transactionDetails, {
      transactionDescription,
      transactionType,
      amount,
      wallet,
    });

    await queryRunner.manager.save(transactionDetails);

    return transactionDetails;
  }
}

export default new TransactionDetailsService();
