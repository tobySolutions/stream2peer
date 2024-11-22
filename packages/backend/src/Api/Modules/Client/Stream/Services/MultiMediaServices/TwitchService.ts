import { HttpClient } from 'Lib/Infra/Internal/HttpClient';
import { authConfig } from 'Config/authConfig';
import { NULL_OBJECT } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';

class TwitchAuthService {
  public getTwitchAuthUrl(): string {
    const clientId = authConfig.twitchClientId;
    const redirectUri = authConfig.twitchRedirectURI;
    const scope = 'channel:read:stream_key';
    const responseType = 'code';

    return `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  }

  public async exchangeCodeForTokens(code: string) {
    const response = await HttpClient.post({
      url: 'https://id.twitch.tv/oauth2/token',
      body: {
        client_id: authConfig.twitchClientId,
        client_secret: authConfig.twitchClientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: authConfig.twitchRedirectURI,
      },
    });
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }

  public async refreshAccessToken(refreshToken: string) {
    const response = await HttpClient.post({
      url: 'https://id.twitch.tv/oauth2/token',
      body: {
        client_id: authConfig.twitchClientId,
        client_secret: authConfig.twitchClientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
    });
    return response.access_token;
  }

  public async getUserDetails(accessToken: string) {
    try {
      const response = await HttpClient.get({
        url: 'https://api.twitch.tv/helix/users',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Client-Id': authConfig.twitchClientId,
        },
      });
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      console.log('Failed to fetch user details: No user data found.');
      return NULL_OBJECT;
    } catch (getUserDetailsError) {
      console.error('Error fetching user details ->', getUserDetailsError);
      return NULL_OBJECT;
    }
  }

  public async getStreamKey(
    refreshToken: string,
    authCalls: number = 0,
  ): Promise<string | null> {
    const MAX_AUTH_CALLS = 2;
    try {
      if (authCalls >= MAX_AUTH_CALLS) {
        console.log('Maximum auth attempts reached. Returning NULL_OBJECT.');
        return NULL_OBJECT;
      }

      const newAccessToken = await this.refreshAccessToken(refreshToken);

      const userDetails = await this.getUserDetails(newAccessToken);
      if (!userDetails || !userDetails.id) {
        console.error('Failed to fetch broadcaster_id. Returning NULL_OBJECT.');
        return NULL_OBJECT;
      }

      const broadcasterId = userDetails.id;
      //1172109585
      const response = await HttpClient.get({
        url: `https://api.twitch.tv/helix/streams/key?broadcaster_id=${broadcasterId}`,
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
          'Client-Id': authConfig.twitchClientId,
        },
      });
      return response.data[0].stream_key;
    } catch (getStreamKeyError) {
      console.log(
        'Error in getStreamKey, refreshing token...',
        getStreamKeyError,
      );
      return this.getStreamKey(refreshToken, authCalls + 1);
    }
  }
}

export default new TwitchAuthService();
