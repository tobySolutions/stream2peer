import { PlaybackPolicy, StreamProfile } from "./StreamData";

export type createStreamDto = {
    projectId: string; 
    title: string; 
    description: string;
    playBackPolicy?: object;
    profiles?: StreamProfile;
    scheduleDate?: Date;
}

export type MultistreamSpec = {
    name: string;
    url: string;
};

export type MultistreamTarget = {
    profile: string;
    videoOnly: boolean;
    id: string;
    spec: MultistreamSpec;
};

export type Multistream = {
    targets: MultistreamTarget[];
};

export type LivepeerCreateStreamDto = {
    title: string;
    profiles?: StreamProfile[];
    playbackPolicy?: PlaybackPolicy;
    multiStream?: Multistream;
};

//update this later TDL
export type LivepeerUpdateStreamDto = {
    title: string;
    profiles?: StreamProfile[];
    playbackPolicy?: PlaybackPolicy;
    multiStream?: Multistream;
}