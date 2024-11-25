import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import YouTubeAuthController from 'Api/Modules/Client/Stream/Controllers/MultiStreamController/YoutubeAuthController';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';

const routes = Router();

routes.get('/auth', validate, YouTubeAuthController.handle);
routes.post(
  '/callback',
  asyncMiddlewareHandler(authenticateUser), 
  validate, 
  YouTubeAuthController.callback
);

export default routes;
