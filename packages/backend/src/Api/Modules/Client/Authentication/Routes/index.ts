import { Router } from 'express';
import GoogleAuthRoutes from './GoogleAuth';
import GithubAuthRoutes from './GithubAuth';
import MetaMaskAuthRoutes from './MetaMaskAuth';
import ProfileRoutes from './Profile';
// import NotificationRoutes from './Notification';
const routes = Router();

routes.use('', GoogleAuthRoutes);
routes.use('', GithubAuthRoutes);
routes.use('', MetaMaskAuthRoutes);
routes.use('', ProfileRoutes);
// routes.use('', NotificationRoutes);

export default routes;
