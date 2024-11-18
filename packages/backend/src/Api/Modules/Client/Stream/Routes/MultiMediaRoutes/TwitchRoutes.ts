import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import TwitchAuthController from 'Api/Modules/Client/Stream/Controllers/MultiStreamController/TwitchAuthController';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';

const routes = Router();

routes.post('/twitch/auth', asyncMiddlewareHandler(authenticateUser), validate, TwitchAuthController.handle);
routes.get('/twitch/callback', asyncMiddlewareHandler(authenticateUser), validate, TwitchAuthController.callback);

export default routes;