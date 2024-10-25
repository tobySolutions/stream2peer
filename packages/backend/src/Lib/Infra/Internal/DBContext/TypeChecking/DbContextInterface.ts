import { QueryRunner } from "typeorm";

export interface DbContextInterface {
  connect(): null;

  populateDb(): null;

  getEntityRepository(entity: unknown): unknown;

  getTransactionalQueryRunner(): QueryRunner;
}
