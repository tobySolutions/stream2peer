import { ILoggingDriver } from "Lib/Infra/Internal/Logging/ILoggingDriver";

export class LoggingProvider {
  constructor(private driver: ILoggingDriver) {}

  public info(str: string) {
    return this.driver.info(str);
  }

  public error(err: string) {
    return this.driver.error(err);
  }
}
