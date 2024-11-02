import { Request, Response } from "express";
import StreamService from "Api/Modules/Client/Stream/Services/StreamService";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  ERROR,
  SOMETHING_WENT_WRONG,
  SUCCESS,
  RESOURCE_NOT_FOUND,
  NULL_OBJECT,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";

class FetchStreamByIdentifierController {
  public async handle(request: Request, response: Response) {
    try {
      const { streamId } = request.params;

      const stream = await StreamService.getStreamByIdentifier(streamId);

      if (stream==NULL_OBJECT) {
        return response.status(HttpStatusCodeEnum.NOT_FOUND).json({
          status_code: HttpStatusCodeEnum.NOT_FOUND,
          status: ERROR,
          message: RESOURCE_NOT_FOUND,
        });
      }

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        results: stream.singleView(),
      });
    } catch (FetchStreamByIdentifierControllerError) {
      console.error("FetchByIdentifierController.handle FetchByIdentifierError:", FetchStreamByIdentifierControllerError);

      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}

export default new FetchStreamByIdentifierController();