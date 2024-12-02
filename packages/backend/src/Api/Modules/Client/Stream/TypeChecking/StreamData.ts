import { streamConfig } from "Config/streamConfig";

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
  webhookId: streamConfig.livepeerWebhookID,
  refreshInterval: 600,
};

export const defaultPublicPlaybackPolicy: PlaybackPolicy = {
  type: Type.Public,
  refreshInterval: 600,
};