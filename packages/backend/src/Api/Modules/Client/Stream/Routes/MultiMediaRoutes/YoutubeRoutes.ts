import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import YouTubeAuthController from 'Api/Modules/Client/Stream/Controllers/MultiStreamController/YouTubeAuthController';

const routes = Router();

routes.post('/auth', validate, YouTubeAuthController.handle);
routes.get('/callback', validate, YouTubeAuthController.callback);

export default routes;
