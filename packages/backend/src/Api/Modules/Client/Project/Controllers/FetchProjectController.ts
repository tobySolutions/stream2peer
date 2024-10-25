import { Request, Response } from "express";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  ERROR,
  NULL_OBJECT,
  PROJECT_RESOURCE,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  UNAUTHORIZED_OPERATION,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { AuthRequest } from "TypeChecking/GeneralPurpose/AuthRequest";
import ProjectService from "Api/Modules/Client/Project/Services/ProjectService";
import {
  RESOURCE_FETCHED_SUCCESSFULLY,
  RESOURCE_RECORD_NOT_FOUND,
} from "Api/Modules/Common/Helpers/Messages/SystemMessageFunctions";

class FetchProjectByIdentifierController {
  public async handle(request: Request, response: Response) {
    try {
      const user = (request as AuthRequest).authAccount;

      const { projectId } = request.params;

      const project = await ProjectService.getProjectByIdentifier(
        projectId
      );

      if (project === NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.NOT_FOUND).json({
          status_code: HttpStatusCodeEnum.NOT_FOUND,
          status: ERROR,
          message: RESOURCE_RECORD_NOT_FOUND(PROJECT_RESOURCE),
        });
      }

      const isAuthorizedUser = await ProjectService.viewProject(project,user);
      if (!isAuthorizedUser) {
        return response.status(HttpStatusCodeEnum.FORBIDDEN).json({
          status_code: HttpStatusCodeEnum.FORBIDDEN,
          status: ERROR,
          message: UNAUTHORIZED_OPERATION,
        });
      }

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: RESOURCE_FETCHED_SUCCESSFULLY("PROJECT"),
        results: project.singleView()
      });
    } catch (FetchProjectByIdentifierControllerError) {
      console.log(
        "🚀 ~ FetchProjectByIdentifierController.handle FetchProjectByIdentifierControllerError ->",
        FetchProjectByIdentifierControllerError
      );

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new FetchProjectByIdentifierController();
