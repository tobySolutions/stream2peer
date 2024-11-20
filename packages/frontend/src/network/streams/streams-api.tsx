import instance from "../axios";
import { AddProjectProps } from "../projects/types";
import { ICreateStream } from "./types";

export const createLiveStream = async (
  projectId: string,
  payload: ICreateStream
) => {
  const { data } = await instance.post(`/Stream/${projectId}/Create`, payload);
  return data;
};

export const fetchAllStreams = async (
  projectId: string,
) => {
  const { data } = await instance.get(`/Stream/${projectId}/fetch/all`);
  return data;
};

export const connectToTwitch = async () => {
  const { data } = await instance.get(`/Stream/`)
}