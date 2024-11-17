import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import NotificationController from 'Api/Modules/Client/Authentication/Controllers/NotificationController';
import { asyncMiddlewareHandler } from 'Utils/asyncMiddlewareHandler';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';

const routes = Router();

routes.post('/notifications/all',asyncMiddlewareHandler(authenticateUser), validate, NotificationController.handle);

routes.post('/notification/:notificationId',asyncMiddlewareHandler(authenticateUser), validate, NotificationController.fetchByIdentifier);

export default routes;
