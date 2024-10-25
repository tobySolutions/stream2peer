import { Router } from "express";
import validate from "Api/Validators/Common/validate";
import MetaMaskAuthController from "Api/Modules/Client/Authentication/Controllers/MetaMaskAuthController";

const routes = Router();

routes.post(
  "/meta-mask/auth",
  validate,
  MetaMaskAuthController.handle
);

routes.post(
  "/meta-mask/verify",
  validate,
  MetaMaskAuthController.verify
);

export default routes;
