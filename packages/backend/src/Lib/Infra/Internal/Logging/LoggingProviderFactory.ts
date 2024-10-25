import { WinstonDriver } from "./WinstonDriver";
import { LoggingProvider } from "./LoggingProvider";
import { PROVIDER_NOT_FOUND } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { loggingConfig } from "Config/loggingConfig";

export class LoggingProviderFactory {
  public static build() {
    if (LoggingProviderFactory.getCurrentProvider() === "winston") {
      return new LoggingProvider(new WinstonDriver());
    } else {
      throw new Error(PROVIDER_NOT_FOUND);
    }
  }

  public static getCurrentProvider() {
    return loggingConfig.LOGGING_PROVIDER;
  }
}
