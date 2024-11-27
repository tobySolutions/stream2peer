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

export const connectToTwitch = async () => {
  const { data } = await instance.get(`/MultiStream/twitch/auth`);
  return data;
};

export const validateTwitch = async (code: string) => {
  const { data } = await instance.post(
    `/multistream/twitch/callback?code=${code}&scope=channel%3Aread%3Astream_key`
  );

  if (data["status_code"] === 200) {
    console.log(data, "200");
    return {
      data,
      statusCode: data["status_code"],
    };
  }
};
