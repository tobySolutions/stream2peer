export interface ILoggingDriver {
  info(msg: string): void;

  error(msg: string): void;
}
