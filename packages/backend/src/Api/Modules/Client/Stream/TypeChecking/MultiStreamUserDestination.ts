export type StreamDestination = {
    platform: Platforms;
    url: string;
    token?: string;
};

export enum Platforms{
    Linkedin = "Linkedin",
    Youtube = "Youtube",
    Twitch = "Twitch",
    Facebook = "Facebook",
    Twitter = "Twitter"
}