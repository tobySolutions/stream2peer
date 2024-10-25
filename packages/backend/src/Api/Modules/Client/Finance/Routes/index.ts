import { Router } from "express";
import WalletRoutes from "./WalletRoutes";
import ExternalTransactionRoutes from "./ExternalTransactionRoutes";

const routes = Router();

routes.use("", WalletRoutes);
routes.use("", ExternalTransactionRoutes);

export default routes;
