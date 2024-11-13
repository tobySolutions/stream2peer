import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import GoogleAuthController from 'Api/Modules/Client/Authentication/Controllers/GoogleAuthController';

const routes = Router();

routes.post('/google', validate, GoogleAuthController.handle);

routes.get('/google/callback', validate, GoogleAuthController.callback);

export default routes;
