import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import EmailSignInController from 'Api/Modules/Client/Authentication/Controllers/EmailSignInController';
import {EmailSignInValidator} from 'Api/Modules/Client/Authentication/Validators/EmailValidators';
const routes = Router();

routes.get(
  '/email/sign-in',
  EmailSignInValidator,
  validate,
  EmailSignInController.handle,
);

routes.post(
  '/email/verify-token',
  validate,
  EmailSignInController.verifyToken,
);

export default routes;
