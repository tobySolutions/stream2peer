//TDL
// public async getStreamKey(request: Request, response: Response) {
//     try {
//       const { accessToken, refreshToken } = request.user.tokens;

//       const streamKey = await YouTubeAuthService.getOrCreateStreamKey(accessToken, refreshToken);
//       return response.status(HttpStatusCodeEnum.OK).json({
//         status_code: HttpStatusCodeEnum.OK,
//         status: SUCCESS,
//         data: { streamKey },
//       });
//     } catch (error) {
//       console.log('YouTubeAuthController.getStreamKey error ->', error);
//       return response.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
//         status_code: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
//         status: ERROR,
//         message: SOMETHING_WENT_WRONG,
//       });
//     }
//   }
