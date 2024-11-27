import { Router } from 'express';
import GoogleAuthRoutes from './GoogleAuth';
import GithubAuthRoutes from './GithubAuth';
import MetaMaskAuthRoutes from './MetaMaskAuth';
import EmailAuthRoutes from './EmailAuth';
import ProfileRoutes from './ProfileAuth';
const routes = Router();

routes.use('', GoogleAuthRoutes);
routes.use('', GithubAuthRoutes);
routes.use('', MetaMaskAuthRoutes);
routes.use('', EmailAuthRoutes);
routes.use('', ProfileRoutes);

export default routes;
