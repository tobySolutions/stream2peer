import instance from "../axios";
import { ICreateStream } from "./types";

export const createLiveStream = async (
  projectId: string,
  payload: ICreateStream
) => {
  const { data } = await instance.post(`/Stream/${projectId}/Create`, payload);
  return data;
};

export const fetchAllStreams = async (projectId: string) => {
  const { data } = await instance.get(`/Stream/${projectId}/fetch/all`);
  return data;
};

export const connectToYouTube = async () => {
  const { data } = await instance.get(`/MultiStream/youtube/auth`);
  return data;
};

export const validateYouTube = async (code: string) => {
  const { data } = await instance.post(
    `/multistream/youtube/callback?code=${code}&scope=https://www.googleapis.com/auth/youtube`
  );

  if (data["status_code"] === 200) {
    return {
      data,
      statusCode: data["status_code"],
    };
  }
};

export const connectToTwitch = async () => {
  const { data } = await instance.get(`/MultiStream/twitch/auth`);
  return data;
};

export const validateTwitch = async (code: string) => {
  const { data } = await instance.post(
    `/multistream/twitch/callback?code=${code}&scope=channel%3Aread%3Astream_key`
  );

  if (data["status_code"] === 200) {
    return {
      data,
      statusCode: data["status_code"],
    };
  }
};

export const disconnectPlatform = async (platform: "Twitch" | "Youtube") => {
  const { data } = await instance.delete("/auth/profile/remove-platform", {
    data: { platform },
  });
  return data;
};
