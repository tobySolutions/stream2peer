import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import {
  ERROR,
  NULL_OBJECT,
  PROJECT_RESOURCE,
  SOMETHING_WENT_WRONG,
  SUCCESS,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { AuthRequest } from 'TypeChecking/GeneralPurpose/AuthRequest';
import ProjectService from 'Api/Modules/Client/Project/Services/ProjectService';
import { RESOURCE_RECORD_NOT_FOUND } from 'Api/Modules/Common/Helpers/Messages/SystemMessageFunctions';

const dbContext = container.resolve(DbContext);

class DeleteProjectController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();

    await queryRunner.startTransaction();
    try {
      const { projectId } = request.params;

      const user = (request as AuthRequest).authAccount;

      const project = await ProjectService.getProjectByIdentifier(projectId);

      if (project === NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.NOT_FOUND).json({
          status_code: HttpStatusCodeEnum.NOT_FOUND,
          status: ERROR,
          message: RESOURCE_RECORD_NOT_FOUND(PROJECT_RESOURCE),
        });
      }

      if (project.owner.userId !== user.userId) {
        return response.status(HttpStatusCodeEnum.FORBIDDEN).json({
          status_code: HttpStatusCodeEnum.FORBIDDEN,
          status: ERROR,
          message: 'You are not authorized to delete this project.',
        });
      }

      await ProjectService.deleteProject(projectId, queryRunner);

      await queryRunner.commitTransaction();

      return response.status(HttpStatusCodeEnum.NO_CONTENT).json({
        status_code: HttpStatusCodeEnum.NO_CONTENT,
        status: SUCCESS,
      });
    } catch (DeleteProjectControllerError) {
      console.log(
        '🚀 ~ DeleteProjectController.handle DeleteProjectControllerError ->',
        DeleteProjectControllerError,
      );

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new DeleteProjectController();
