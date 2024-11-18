import { Request, Response, Router } from 'express';

import AuthRoutes from 'Api/Modules/Client/Authentication/Routes/index';
import ProjectRoutes from 'Api/Modules/Client/Project/Routes/ProjectRoute';
import StreamRoutes from 'Api/Modules/Client/Stream/Routes/StreamRoutes';
import MultiStreamRoutes from 'Api/Modules/Client/Stream/Routes/MultiStreamRoutes';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';

import {
  SUCCESS,
  WELCOME_TO_API,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';

const routes = Router();

routes.use('/Auth', AuthRoutes);
routes.use('/Project', ProjectRoutes);
routes.use('/Stream', StreamRoutes);
routes.use('/MultiStream', MultiStreamRoutes);

routes.use('/', (request: Request, response: Response) => {
  response.status(HttpStatusCodeEnum.OK).json({
    status_code: HttpStatusCodeEnum.OK,
    status: SUCCESS,
    message: WELCOME_TO_API,
  });
});
export default routes;
