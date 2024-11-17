import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import NotificationController from 'Api/Modules/Client/Authentication/Controllers/NotificationController';

const routes = Router();

routes.post('/notifications/all',asyncMiddlewareHandler(authenticateUser), validate, NotificationController.handle);

routes.post('/notification/:notificationId',asyncMiddlewareHandler(authenticateUser), validate, NotificationController.fetchByIdentifier);

export default routes;
