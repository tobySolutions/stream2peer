/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from 'Lib/Infra/Internal/HttpClient';
import { authConfig } from 'Config/authConfig';
import { NULL_OBJECT } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';

class YouTubeAuthService {
  public getYouTubeAuthUrl(): string {
    const clientId = authConfig.googleClientId;
    const redirectUri = authConfig.youtubeRedirectUri;
    const scope = 'https://www.googleapis.com/auth/youtube';
    const accessType = 'offline';
    const responseType = 'code';
    const prompt = 'consent';

    return `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;
  }

  public async exchangeCodeForTokens(code: string) {
    const response = await HttpClient.post({
      url: 'https://oauth2.googleapis.com/token',
      body: {
        code,
        client_id: authConfig.googleClientId,
        client_secret: authConfig.googleClientSecret,
        redirect_uri: authConfig.youtubeRedirectUri,
        grant_type: 'authorization_code',
      },
    });
    return { accessToken: response.access_token, refreshToken: response.refresh_token };
  }

  public async refreshAccessToken(refreshToken: string) {
    const response = await HttpClient.post({
      url: 'https://oauth2.googleapis.com/token',
      body: {
        client_id: authConfig.googleClientId,
        client_secret: authConfig.googleClientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
    });
    return response.access_token;
  }

  public async getStreamKey(
    refreshToken: string,
    title: string,
    scheduleDate: string,
    authCalls: number = 0
  ): Promise<string | null> {
    const MAX_AUTH_CALLS = 1;
    try {
      if (authCalls >= MAX_AUTH_CALLS) {
        console.log('Maximum auth attempts reached. Returning NULL_OBJECT.');
        return NULL_OBJECT; 
      }
      const newAccessToken = await this.refreshAccessToken(refreshToken);  
      const broadcastId = await this.createBroadcast(newAccessToken, title, scheduleDate);
      const streamId = await this.createStream(newAccessToken, title);
      await this.bindBroadcastToStream(newAccessToken, broadcastId, streamId);
  
      const streamDetails = await HttpClient.get({
        url: 'https://www.googleapis.com/youtube/v3/liveStreams',
        headers: { Authorization: `Bearer ${newAccessToken}` },
        params: { part: 'cdn', id: streamId },
      });
  
      return streamDetails.items[0].cdn.ingestionInfo.streamName;
    } catch (getStreamKeyError:any) {
      console.log('Error in getOrCreateStreamKey, refreshing token...', getStreamKeyError.response?.data?.error?.errors);
      return this.getStreamKey(refreshToken, title, scheduleDate, authCalls + 1);
    }
  }
  

  public async createBroadcast(accessToken: string, title:string, scheduleDate:string) {
    try {
      console.log(accessToken);
      const newBroadcast = await HttpClient.post({
        url: 'https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: {
          snippet: {
            title,
            scheduledStartTime: scheduleDate,
          },
          status: { privacyStatus: 'public' },
        },
      });
      return newBroadcast.id;
    } catch (createBroadcastError:any) {
      console.log('Error creating broadcast:', createBroadcastError.response?.data?.error?.errors);
      throw new Error('Error creating broadcast');
    }
  }
  
  public async createStream(accessToken: string, title: string) {
    try {
      const newStream = await HttpClient.post({
        url: 'https://www.googleapis.com/youtube/v3/liveStreams?part=snippet,cdn',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: {
          part: 'snippet,cdn',
          snippet: {
            title,
          },
          cdn: {
            format: '1080p',
            frameRate: '30fps',
            ingestionType: 'rtmp',
            resolution: '1080p',
          },
        },
      });
      return newStream.id;
    } catch (CreateStreamError:any) {
      console.log('Error creating stream:', CreateStreamError.response?.data?.error?.errors);
      throw new Error('Error creating stream');
    }
  }
  
  public async bindBroadcastToStream(accessToken: string, broadcastId: string, streamId: string) {
    try {  
      await HttpClient.post({
        url: `https://www.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${broadcastId}&part=id,contentDetails`,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { id: broadcastId, streamId, part: 'id,contentDetails', },
      });
      console.log(`Successfully bound broadcastId ${broadcastId} to streamId ${streamId}`);
    } catch (bindBroadcastToStreamError:any) {
      console.log('Error binding broadcast to stream:', bindBroadcastToStreamError.response?.data?.error?.errors);
      throw new Error('Error binding broadcast to stream');
    }
  }
}

export default new YouTubeAuthService();
