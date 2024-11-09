import { Router } from 'express';
import GoogleAuthRoutes from './GoogleAuth';
import GithubAuthRoutes from './GithubAuth';
import MetaMaskAuthRoutes from './MetaMaskAuth';

const routes = Router();

routes.use('', GoogleAuthRoutes);
routes.use('', GithubAuthRoutes);
routes.use('', MetaMaskAuthRoutes);

export default routes;
