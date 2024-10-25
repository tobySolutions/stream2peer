import { errorHandler } from "Api/Modules/Common/Exceptions/ErrorHandler";

process.on("uncaughtException", (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);
  errorHandler.handleError(error);
});
