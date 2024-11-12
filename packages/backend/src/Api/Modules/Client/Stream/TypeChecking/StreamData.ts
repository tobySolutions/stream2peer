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
  webhookId: 'bf5e608c-750d-4926-bdb0-db840d6f0316',
  refreshInterval: 600,
};
