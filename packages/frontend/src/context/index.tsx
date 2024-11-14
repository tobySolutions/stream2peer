import { createContext, ReactNode, useState } from "react";
import { ProjectDetails, ValueProp } from "./types";

export const StateContext = createContext({} as ValueProp);

const StateProvider = ({ children }: { children: ReactNode }) => {
  const [ProjectsData, setProjectData] = useState<ProjectDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [livestreamData, setLiveStreamData] = useState<any>([]);
  const [currentStream, setCurrentStream] = useState<any>({})


  return (
    <StateContext.Provider
      value={{
        ProjectsData,
        setProjectData,
        loading,
        currentStream,
        setCurrentStream,
        setLoading,
        livestreamData,
        setLiveStreamData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
