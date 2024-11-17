import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import GoogleAuthController from 'Api/Modules/Client/Authentication/Controllers/GoogleAuthController';

const routes = Router();

routes.get('/google', validate, GoogleAuthController.handle);

routes.post('/google/callback', validate, GoogleAuthController.callback);

export default routes;
