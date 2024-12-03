import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import ProfileController from 'Api/Modules/Client/Authentication/Controllers/ProfileController';
import RemovePlatformController from 'Api/Modules/Client/Authentication/Controllers/RemovePlatformController';
import { RemovePlatformValidator } from 'Api/Modules/Client/Authentication/Validators/ProfileValidators';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';

const routes = Router();

routes.get(
  '/profile',
  asyncMiddlewareHandler(authenticateUser),
  validate,
  ProfileController.handle,
);

routes.delete(
  '/profile/remove-platform',
  RemovePlatformValidator,
  asyncMiddlewareHandler(authenticateUser),
  validate,
  RemovePlatformController.handle
);
export default routes;
