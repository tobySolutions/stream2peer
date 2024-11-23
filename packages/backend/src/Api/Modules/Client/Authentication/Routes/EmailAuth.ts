import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import EmailSignInController from 'Api/Modules/Client/Authentication/Controllers/EmailSignInController';

const routes = Router();

routes.get(
  '/email/sign-in',
  validate,
  EmailSignInController.handle,
);

routes.post(
  '/email/verify-token',
  validate,
  EmailSignInController.verifyToken,
);

export default routes;
