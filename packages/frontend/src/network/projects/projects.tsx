import instance from "../axios";


export const FetchAllProjects = async () => {
  const { data } = await instance.get(`/project/all`);
  return data;
};