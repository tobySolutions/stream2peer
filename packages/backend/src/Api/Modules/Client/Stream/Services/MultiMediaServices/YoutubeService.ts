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

    return `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`;
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
    const MAX_AUTH_CALLS = 2;
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
    } catch (getStreamKeyError) {
      console.log('Error in getOrCreateStreamKey, refreshing token...', getStreamKeyError);
      return this.getStreamKey(refreshToken, title, scheduleDate, authCalls + 1);
    }
  }
  

  public async createBroadcast(accessToken: string, title:string, scheduleDate:string) {
    try {
      const newBroadcast = await HttpClient.post({
        url: 'https://www.googleapis.com/youtube/v3/liveBroadcasts',
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
    } catch (createBroadcastError) {
      console.log('Error creating broadcast:', createBroadcastError);
      throw new Error('Error creating broadcast');
    }
  }
  
  public async createStream(accessToken: string, title: string) {
    try {
      const newStream = await HttpClient.post({
        url: 'https://www.googleapis.com/youtube/v3/liveStreams',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: {
          snippet: { title },
          cdn: { format: '1080p', ingestionType: 'rtmp' },
        },
      });
      return newStream.id;
    } catch (CreateStreamError) {
      console.log('Error creating stream:', CreateStreamError);
      throw new Error('Error creating stream');
    }
  }
  
  public async bindBroadcastToStream(accessToken: string, broadcastId: string, streamId: string) {
    try {
      await HttpClient.post({
        url: 'https://www.googleapis.com/youtube/v3/liveBroadcasts/bind',
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { id: broadcastId, streamId },
      });
      console.log(`Successfully bound broadcastId ${broadcastId} to streamId ${streamId}`);
    } catch (bindBroadcastToStreamError) {
      console.log('Error binding broadcast to stream:', bindBroadcastToStreamError);
      throw new Error('Error binding broadcast to stream');
    }
  }
}

export default new YouTubeAuthService();
