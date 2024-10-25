import { Router } from "express";
import { asyncMiddlewareHandler } from "Utils/asyncMiddlewareHandler";
import { isAuthenticated } from "Api/Middleware/isAuthenticated";
import VerifyTransactionController from "Api/Modules/Client/Finance/Controllers/ExternalTransaction/VerifyTransactionController";
import { VerifyTransactionValidator } from "Api/Modules/Client/Finance/Validators/ExternalTransaction/VerifyTransactionValidator";
import validate from "Api/Validators/Common/validate";

const routes = Router();

routes.get(
  "/Process/VerifyTransaction/:transactionReference",
  asyncMiddlewareHandler(isAuthenticated),
  VerifyTransactionValidator,
  validate,
  VerifyTransactionController.handle
);

export default routes;
