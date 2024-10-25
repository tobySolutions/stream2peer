import { Router } from "express";
import { asyncMiddlewareHandler } from "Utils/asyncMiddlewareHandler";
import { isAuthenticated } from "Api/Middleware/isAuthenticated";
import { LoadWalletValidator } from "Api/Modules/Client/Finance/Validators/Wallet/LoadWalletValidator";
import validate from "Api/Validators/Common/validate";
import LoadWalletController from "Api/Modules/Client/Finance/Controllers/Wallet/LoadWalletController";
import GetWalletController from "Api/Modules/Client/Finance/Controllers/Wallet/GetWalletController";

const routes = Router();

routes.post(
  "/Process/LoadWallet",
  asyncMiddlewareHandler(isAuthenticated),
  LoadWalletValidator,
  validate,
  LoadWalletController.handle
);

routes.get(
  "/Fetch/Wallet",
  asyncMiddlewareHandler(isAuthenticated),
  GetWalletController.handle
);

export default routes;
