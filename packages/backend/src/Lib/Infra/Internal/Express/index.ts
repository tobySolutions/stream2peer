import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { expressConfig } from 'Config//expressConfig';
import {
  ILoggingDriver,
  LoggingProviderFactory,
} from 'Lib/Infra/Internal/Logging';
import 'express-async-errors';
import routes from 'Api/Routes';
import { errorHandler } from 'Api/Modules/Common/Exceptions/ErrorHandler';
import {
  MIDDLEWARE_ATTACHED,
  MYSQLDB_CONNECTED,
  MYSQLDB_CONNECTION_ERROR,
  ROUTES_ATTACHED,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { DbContext } from 'Lib/Infra/Internal/DBContext';

export default class Express {
  app: express.Express;
  dbContext: DbContext;
  loggingProvider: ILoggingDriver;

  constructor(dbContext: DbContext) {
    this.loggingProvider = LoggingProviderFactory.build();
    this.dbContext = dbContext;
    this.#bootstrap();
  }

  #bootstrap() {
    this.app = express();
    Promise.resolve(this.#connectMySQLDatabase())
      .then(() => {
        this.loggingProvider.info(MYSQLDB_CONNECTED);
      })
      .catch((MySQLDBConnectionError) => {
        console.log(
          '🚀 ~ Express. MySQLDBConnectionError ->',
          MySQLDBConnectionError,
        );
        this.loggingProvider.error(MYSQLDB_CONNECTION_ERROR);
      });

    this.#attachMiddlewares();
    this.#attachRouters();
    this.#attachErrorHandlers();
  }

  #attachMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: Express.getCorsWhiteList() as string[],
      }),
    );
    this.loggingProvider.info(MIDDLEWARE_ATTACHED);
  }

  async #connectMySQLDatabase() {
    await this.dbContext.connect();
  }

  #attachRouters() {
    this.app.use('/Interface', routes);
    this.loggingProvider.info(ROUTES_ATTACHED);
  }

  public static getCorsWhiteList(): Array<string> {
    console.log(expressConfig.corsWhitelist);
    return expressConfig.corsWhitelist;
  }

  #attachErrorHandlers() {
    // https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/

    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        console.log(err);
        this.loggingProvider.error(err.message);
        next(err);
      },
    );

    this.app.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        errorHandler.handleError(err, response);
      },
    );
  }
}
