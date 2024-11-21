import { Request, Response } from 'express';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import {
  ERROR,
  INFORMATION_RETRIEVED,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { AuthRequest } from 'TypeChecking/GeneralPurpose/AuthRequest';
import ProjectService from 'Api/Modules/Client/Project/Services/ProjectService';

class ListUserProjectsController {
  public async handle(request: Request, response: Response) {
    try {
      const user = (request as AuthRequest).authAccount;

      const { skip = 0, limit = 10 } = request.query;

      const projects = await ProjectService.listProjectsByPeerId(user.userId, {
        pageNumber: Number(skip),
        documentSize: Number(limit),
      });

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: INFORMATION_RETRIEVED,
        results: {
          data: projects.data?.map((project) => project.listView()),
          meta: projects.meta,
        },
      });
    } catch (ListUserProjectsControllerError) {
      console.log(
        '🚀 ~ ListUserProjectsController.handle ListUserProjectsControllerError ->',
        ListUserProjectsControllerError,
      );

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new ListUserProjectsController();
