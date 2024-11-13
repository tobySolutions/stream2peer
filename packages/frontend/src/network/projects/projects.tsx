import instance from "../axios";
import { AddProjectProps, UpdateProjectProps } from "./types";

export const FetchAllProjects = async () => {
  const { data } = await instance.get(`/project/all`);
  return data;
};

export const AddProject = async (payload: AddProjectProps) => {
  const { data } = await instance.post(`/project/create`, payload);
  return data;
};

export const FetchProjectById = async (id: string) => {
  const { data } = await instance.get(`/project/fetch/${id}`);
  return data;
};

export const deleteProject = async (id: string) => {
  const { data } = await instance.delete(`/project/delete/${id}`);
  return data;
};

export const updateProject = async (id: string, payload: UpdateProjectProps) => {
  const { data } = await instance.put(`/project/update/${id}`, payload);
  return data;
};