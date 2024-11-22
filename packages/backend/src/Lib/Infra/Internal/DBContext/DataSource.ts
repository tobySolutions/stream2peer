import { DataSource } from 'typeorm';
import { dbConfig } from 'Config/dbConfig';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthAccount } from 'Api/Modules/Client/Authentication/Entities/AuthAccount';
import { Project } from 'Api/Modules/Client/Project/Entities/Project';
import { Stream } from 'Api/Modules/Client/Stream/Entities/Stream';
import { CreateTables1729503760012 } from 'src/Migrations/1729503760012-createTables';
import { UpdateAuthProjectStreamEntities1731363722903 } from 'src/Migrations/1731363722903-updateAuthProjectStreamEntities';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.dbName,
  entities: [AuthAccount, Project, Stream],
  migrations: [
    CreateTables1729503760012,
    UpdateAuthProjectStreamEntities1731363722903,
  ],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});
