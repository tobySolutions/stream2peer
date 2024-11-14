import instance from "../axios";

// export const login = async (payload: AddProjectProps) => {
//   const { data } = await instance.post(`/project/create`, payload);
//   return data;
// };
export const authWithGoogle = async (payload: any) => {
    const { data } = await instance.post(`/auth/google`, payload);
    return data;
  };
