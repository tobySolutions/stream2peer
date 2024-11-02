import { Request, Response } from "express";
import { container } from "tsyringe";
import StreamService from "Api/Modules/Client/Stream/Services/StreamService";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  RESOURCE_CREATED,
  SOMETHING_WENT_WRONG,
  ERROR,
  SUCCESS,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";

const dbContext = container.resolve(DbContext);

class CreateStreamController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { projectId } = request.params;
      const { title, description, profiles, scheduleDate } = request.body;

      const stream = await StreamService.createStream(
        { projectId, title, description, profiles, scheduleDate },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return response.status(HttpStatusCodeEnum.CREATED).json({
        status_code: HttpStatusCodeEnum.CREATED,
        status: SUCCESS,
        message: RESOURCE_CREATED,
        results: stream,
      });
    } catch (CreateStreamControllerError) {
      console.error("CreateStreamController.handle CreateStreamError:", CreateStreamControllerError);
      await queryRunner.rollbackTransaction();

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new CreateStreamController();
