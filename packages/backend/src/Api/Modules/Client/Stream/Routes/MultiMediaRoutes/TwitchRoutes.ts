import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import TwitchAuthController from 'Api/Modules/Client/Stream/Controllers/MultiStreamController/TwitchAuthController';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';

const routes = Router();

routes.get('/auth',
    // asyncMiddlewareHandler(authenticateUser), 
    validate, TwitchAuthController.handle);
routes.post('/callback',
    asyncMiddlewareHandler(authenticateUser), 
    validate, TwitchAuthController.callback);

export default routes;