import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { HttpStatusCodeEnum } from 'Utils/HttpStatusCodeEnum';
import StreamService from 'Api/Modules/Client/Stream/Services/StreamService';
import {
  ERROR,
  SUCCESS,
  RESOURCE_NOT_FOUND,
  INFORMATION_UPDATED,
  NULL_OBJECT,
} from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { StreamStatus } from '../../../TypeChecking/StreamStatus';
import { Stream } from '../../../Entities/Stream';

const dbContext = container.resolve(DbContext);

class StreamEventController {
  public async handle(request: Request, response: Response) {
    const queryRunner = await dbContext.getTransactionalQueryRunner();
    await queryRunner.startTransaction();

    try {
        const event = request.body;
        let streamEvent:Stream;
        switch (event.type) {
        case 'stream.started':
            streamEvent = await StreamService.updateStreamStatus(
                event.streamId,
                StreamStatus.LIVE,
                queryRunner,
              );
          break;
        case 'stream.suspended':
            streamEvent = await StreamService.updateStreamStatus(
                event.streamId,
                StreamStatus.SUSPENDED,
                queryRunner,
              );
          break;
        default:
            throw new Error("Invalid Event Type");
      }

      if (streamEvent == NULL_OBJECT) {
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
    } catch (ActivateStreamControllerError) {
      console.error(
        'ActivateStreamController.handle ActivateStreamControllerError:',
        ActivateStreamControllerError,
      );
      await queryRunner.rollbackTransaction();

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: 'An error occurred while activating the stream.',
      });
    }
  }
}

export default new StreamEventController();