import { Request, Response } from "express";
import { container } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import StreamService from "Api/Modules/Client/Stream/Services/StreamService";
import {
  ERROR,
  SUCCESS,
  NULL_OBJECT,
  INFORMATION_UPDATED,
  RESOURCE_NOT_FOUND,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";

const dbContext = container.resolve(DbContext);

class SuspendStreamController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { streamId } = request.params;

      const suspendedStream = await StreamService.suspendStream(streamId, queryRunner);

      if (suspendedStream==NULL_OBJECT) {
        await queryRunner.rollbackTransaction();
        return response.status(HttpStatusCodeEnum.NOT_FOUND).json({
          status_code: HttpStatusCodeEnum.NOT_FOUND,
          status: ERROR,
          message: RESOURCE_NOT_FOUND,
        });
      }

      await queryRunner.commitTransaction();

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: INFORMATION_UPDATED,
      });
    } catch (SuspendStreamControllerError) {
      console.error("SuspendStreamController.handle SuspendStreamControllerError:", SuspendStreamControllerError);
      await queryRunner.rollbackTransaction();

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: "An error occurred while suspending the stream.",
      });
    }
  }
}

export default new SuspendStreamController();