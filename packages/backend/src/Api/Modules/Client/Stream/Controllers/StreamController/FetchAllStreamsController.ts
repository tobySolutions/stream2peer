import { Request, Response } from "express";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import StreamService from "Api/Modules/Client/Stream/Services/StreamService";
import {
  ERROR,
  SUCCESS,
  INFORMATION_RETRIEVED,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";

class FetchAllStreamsController {
  public async handle(request: Request, response: Response) {
    try {
      const { projectId } = request.query;

      if (!projectId) {
        return response.status(HttpStatusCodeEnum.BAD_REQUEST).json({
          status_code: HttpStatusCodeEnum.BAD_REQUEST,
          status: ERROR,
          message: "Project ID is required to fetch streams.",
        });
      }

      const streams = await StreamService.getAllStreams(projectId as string);

      return response.status(HttpStatusCodeEnum.OK).json({
        status_code: HttpStatusCodeEnum.OK,
        status: SUCCESS,
        message: INFORMATION_RETRIEVED,
        results: streams.map((stream)=>stream.listView()),
      });
    } catch (FetchAllStreamsControllerError) {
      console.error("FetchStreamsController.handle FetchStreamsControllerError:", FetchAllStreamsControllerError);
      return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
        status: ERROR,
        message: "An error occurred while fetching all streams.",
      });
    }
  }
}

export default new FetchAllStreamsController();