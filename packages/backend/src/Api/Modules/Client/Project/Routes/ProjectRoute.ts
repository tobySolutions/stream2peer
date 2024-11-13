import { Router } from 'express';
import CreateProjectController from 'Api/Modules/Client/Project/Controllers/CreateProjectController';
import UpdateProjectController from 'Api/Modules/Client/Project/Controllers/UpdateProjectController';
import DeleteProjectController from 'Api/Modules/Client/Project/Controllers/DeleteProjectController';
import FetchProjectController from 'Api/Modules/Client/Project/Controllers/FetchProjectController';
import ListProjectsController from 'Api/Modules/Client/Project/Controllers/ListProjectsController';
import ProjectInviteController from 'Api/Modules/Client/Project/Controllers/InvitePeerProjectController';
import JoinProjectController from 'Api/Modules/Client/Project/Controllers/JoinProjectController';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';

import { validateProjectToken } from '../Middlewares/ValidateProjectToken';
import validate from 'Api/Validators/Common/validate';
import {
  CreateProjectValidator,
  UpdateProjectValidator,
  ProjectInviteValidator,
  JoinProjectValidator,
  AccessProjectIdentifierValidator,
} from 'Api/Modules/Client/Project/Validators/ProjectValidators';

const routes = Router();

routes.post(
  '/Create',
  asyncMiddlewareHandler(authenticateUser),
  CreateProjectValidator,
  validate,
  CreateProjectController.handle,
);

routes.put(
  '/Update/:projectId',
  asyncMiddlewareHandler(authenticateUser),
  AccessProjectIdentifierValidator,
  UpdateProjectValidator,
  validate,
  UpdateProjectController.handle,
);

routes.delete(
  '/Delete/:projectId',
  asyncMiddlewareHandler(authenticateUser),
  AccessProjectIdentifierValidator,
  validate,
  DeleteProjectController.handle,
);

routes.get(
  '/Fetch/:projectId',
  asyncMiddlewareHandler(authenticateUser),
  AccessProjectIdentifierValidator,
  validate,
  FetchProjectController.handle,
);

routes.get(
  '/all',
  asyncMiddlewareHandler(authenticateUser),
  validate,
  ListProjectsController.handle,
);

//Users that havent signed up on our platform yet,
//Users will be redirected to signup on the platform first.
//Email signup page with authentication link to the platform.
routes.post(
  '/Invite/:projectId',
  asyncMiddlewareHandler(authenticateUser),
  AccessProjectIdentifierValidator,
  ProjectInviteValidator,
  validate,
  ProjectInviteController.handle,
);

routes.post(
  '/Join/:projectId',
  asyncMiddlewareHandler(authenticateUser),
  validateProjectToken,
  JoinProjectValidator,
  validate,
  JoinProjectController.handle,
);

export default routes;
