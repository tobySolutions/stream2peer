import Express from 'Lib/Infra/Internal/Express';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { expressConfig } from 'Config/index';
import { SERVER_STARTED } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { DependencyContainer } from 'tsyringe';

export class Application {
  express: Express;
  container: DependencyContainer;

  constructor(container: DependencyContainer) {
    console.clear();
    this.container = container;
    const dbContext: DbContext = this.container.resolve(DbContext);
    this.express = new Express(dbContext);
  }

  startApp() {
    const port = expressConfig.port;
    this.express.app.listen(port, () => {
      this.express.loggingProvider.info(`${SERVER_STARTED} PORT: ${port}`);
      this.express.loggingProvider.info(`HEALTH: ${port}/ping`);
    });
  }
}
