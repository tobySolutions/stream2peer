import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import FetchNotificationsController from 'Api/Modules/Client/_Notification/Controllers/FetchNotificationsController';
import GetNoficationByIdentifierController from 'Api/Modules/Client/_Notification/Controllers/GetNoficationByIdentifierController';
import { authenticateUser } from 'Api/Middleware/isAuthenticated';

const routes = Router();

routes.post('/all', authenticateUser, validate, FetchNotificationsController.handle);

routes.post('fetch/:notificationId', authenticateUser, validate, GetNoficationByIdentifierController.handle);

export default routes;