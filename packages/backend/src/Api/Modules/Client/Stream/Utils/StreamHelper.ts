import { MultistreamTarget } from '../TypeChecking/createStreamDto';
import { Platform } from '../TypeChecking/MultiStreamUserDestination';

export function transformPlatform(
  platform: Platform,
  token: string,
  title: string,
): MultistreamTarget {
  const rtmpUrls: Record<Platform, string> = {
    [Platform.Linkedin]: 'rtmp://rtmp.linkedin.com/live/',
    [Platform.Youtube]: 'rtmp://a.rtmp.youtube.com/live2/',
    [Platform.Twitch]: 'rtmp://live.twitch.tv/app/',
    [Platform.Facebook]: 'rtmp://live-api.facebook.com:443/rtmp/',
    [Platform.X]: '', //COMING SOON
  };

  if (platform == Platform.X) {
    throw new Error('X is not supported');
  }

  return {
    profile: '720p',
    videoOnly: false,
    spec: {
      name: title,
      url: `${rtmpUrls[platform]}${token}`,
    },
  };
}
