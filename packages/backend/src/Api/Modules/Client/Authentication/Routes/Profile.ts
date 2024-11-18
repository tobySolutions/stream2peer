import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import ProfileController from 'Api/Modules/Client/Authentication/Controllers/ProfileController';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';

const routes = Router();

routes.get('/profile', asyncMiddlewareHandler(authenticateUser), validate, ProfileController.handle);

export default routes;