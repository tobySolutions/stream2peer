import {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from "typeorm";
import { AppDataSource } from "Lib/Infra/Internal/DBContext/DataSource";
import { container, inject, singleton } from "tsyringe";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { InternalServerError } from "Api/Modules/Common/Exceptions/InternalServerError";

container.register("DataSource", { useValue: AppDataSource });

@singleton()
export class DbContext {
  private _dbSource: DataSource;

  constructor(@inject("DataSource") dbSource: DataSource) {
    this._dbSource = dbSource;
  }

  public async connect() {
    await this._dbSource.initialize();
  }

  public getEntityRepository(
    entity: EntityTarget<ObjectLiteral>
  ): Repository<ObjectLiteral> {
    const entityRepository = this._dbSource.getRepository(entity);

    if (entityRepository === NULL_OBJECT)
      throw new InternalServerError("Entity Repository does not exist");

    return entityRepository;
  }

  public async getTransactionalQueryRunner(): Promise<QueryRunner> {
    const queryRunner = await this._dbSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }
}
