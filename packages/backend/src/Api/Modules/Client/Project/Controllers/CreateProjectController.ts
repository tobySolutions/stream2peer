import { Request, Response } from "express";
import { container } from "tsyringe";
import ProjectService from "Api/Modules/Client/Project/Services/ProjectService";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  RESOURCE_RECORD_CREATED_SUCCESSFULLY,
} from "Api/Modules/Common/Helpers/Messages/SystemMessageFunctions";
import {
  ERROR,
  SUCCESS,
  SOMETHING_WENT_WRONG,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { AuthRequest } from "TypeChecking/GeneralPurpose/AuthRequest";
import { ProjectRole } from "../TypeChecking/ProjectRole";

const dbContext = container.resolve(DbContext);

class CreateProjectController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();

    await queryRunner.startTransaction();
    try {
      const { title, description, imageUrl, inviteeId } = request.body;
      const user = (request as AuthRequest).authAccount;

      const projectExists = await ProjectService.getProjectByTitle(title, user.userId);
  
      if (projectExists) {
        return response.status(HttpStatusCodeEnum.CONFLICT).json({
          status_code: HttpStatusCodeEnum.CONFLICT,
          status: ERROR,
          message: `Project with title ${title} already exists.`,
        });
      }

      const project = await ProjectService.createProject({
        userId: user.userId,
        title,
        description,
        imageUrl,
        queryRunner,
      });

      if(inviteeId){
        await ProjectService.sendProjectInvite(inviteeId,project.identifier,ProjectRole.CO_HOST,queryRunner);
      }

      await queryRunner.commitTransaction();

      return response.status(HttpStatusCodeEnum.CREATED).json({
        status_code: HttpStatusCodeEnum.CREATED,
        status: SUCCESS,
        message: RESOURCE_RECORD_CREATED_SUCCESSFULLY("Project"),
        results: project,
      });
    } catch (CreateProjectControllerError) {
      console.error(
        "🚀 ~ CreateProjectController.handle CreateProjectControllerError ->",
        CreateProjectControllerError
      );

      await queryRunner.rollbackTransaction();

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new CreateProjectController();
