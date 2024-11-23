import { Router } from 'express';
import TwitchRoutes from './MultiMediaRoutes/TwitchRoutes';
import YoutubeRoutes from './MultiMediaRoutes/YoutubeRoutes';
// import FacebookRoutes from './MultiMediaRoutes/FacebookRoutes';
// import InstagramRoutes from './MultiMediaRoutes/InstagramRoutes';
// import LinkedinRoutes from './MultiMediaRoutes/LinkedinRoutes';
const routes = Router();

routes.use('/twitch', TwitchRoutes);
routes.use('/youtube', YoutubeRoutes);
// routes.use('', FacebookRoutes);
// routes.use('', InstagramRoutes);
// routes.use('', LinkedinRoutes);

export default routes;
