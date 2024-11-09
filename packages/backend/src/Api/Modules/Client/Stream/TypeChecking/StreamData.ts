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
  webhookId: string;
  webhookContext: {
    projectId: string;
  };
  refreshInterval: number;
};

export const defaultPlaybackPolicy: Omit<PlaybackPolicy, 'webhookContext'> = {
  type: Type.Webhook,
  webhookId: 'baac5982-d090-48ec-a199-064e0f3f52ea',
  refreshInterval: 600,
};
