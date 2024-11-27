export type StreamProfile = {
  name: string;
  bitrate: number;
  fps: number;
  width: number;
  height: number;
};

export enum Type {
  Public = 'public',
  Jwt = 'jwt',
  Webhook = 'webhook',
}

export type PlaybackPolicy = {
  type: Type;
  webhookId?: string;
  webhookContext?: {
    projectId: string;
  };
  refreshInterval: number;
};

export const defaultPlaybackPolicy: PlaybackPolicy = {
  type: Type.Webhook,
  webhookId: 'a48ab65f-35ea-499f-a2c0-0899e86d4629',
  refreshInterval: 600,
};

export const defaultPublicPlaybackPolicy: PlaybackPolicy = {
  type: Type.Public,
  refreshInterval: 600,
};