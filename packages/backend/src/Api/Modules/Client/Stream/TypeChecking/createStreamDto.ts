import { Platform, StreamPlatform } from './MultiStreamUserDestination';
import { PlaybackPolicy, StreamProfile } from './StreamData';

export type createStreamDto = {
  projectId: string;
  title: string;
  description: string;
  playBackPolicy?: object;
  profiles?: StreamProfile[];
  scheduleDate?: Date;
  platforms?: Set<Platform>;
  visibility: boolean;
};

export type MultistreamSpec = {
  name: string;
  url: string;
};

export type MultistreamTarget = {
  profile: string;
  videoOnly: boolean;
  id?: string;
  spec: MultistreamSpec;
};

export type DestinationPlatform = {
  target: MultistreamTarget;
  destinations: StreamPlatform;
}

export type LivepeerCreateStreamDto = {
  title: string;
  profiles?: StreamProfile[];
  playbackPolicy?: PlaybackPolicy;
};

//update this later TODO->>>LATER
export type LivepeerUpdateStreamDto = {
  title: string;
  profiles?: StreamProfile[];
  playbackPolicy?: PlaybackPolicy;
  multiStream?: MultistreamTarget[];
};
