import { StreamProfile } from "../TypeChecking/StreamData";

export const defaultProfiles: StreamProfile[] = [
  {
    name: '720p',
    bitrate: 2000000,
    fps: 30,
    width: 1280,
    height: 720,
  },
  {
    name: '480p',
    bitrate: 1000000,
    fps: 30,
    width: 854,
    height: 480,
  },
  {
    name: '360p',
    bitrate: 500000,
    fps: 30,
    width: 640,
    height: 360,
  },
];
