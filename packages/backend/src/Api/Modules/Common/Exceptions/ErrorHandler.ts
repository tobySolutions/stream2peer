import { Response } from 'express';
import ApplicationError from './ApplicationError';
import {
  CRITICAL_ERROR_EXITING,
  ERROR,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof ApplicationError) {
      return error.isOperational;
    }

    return false;
  }

  public handleError(
    error: Error | ApplicationError,
    response?: Response,
  ): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as ApplicationError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(
    error: ApplicationError,
    response: Response,
  ): void {
    response.status(error.httpCode).json({
      status_code: error.httpCode,
      status: ERROR,
      message: error.message,
    });
  }

  private handleCriticalError(
    error: Error | ApplicationError,
    response?: Response,
  ): void {
    if (response) {
      response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: error.message,
      });
    }
    console.log(error);
    console.log(CRITICAL_ERROR_EXITING);
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
