import { createContext, ReactNode, useState } from "react";
import { ProjectDetails, ValueProp } from "./types";

export const StateContext = createContext({} as ValueProp);

const StateProvider = ({ children }: { children: ReactNode }) => {
  const [ProjectsData, setProjectData] = useState<ProjectDetails[]>([]);

  


  return <StateContext.Provider value={{ProjectsData, setProjectData}}>{children}</StateContext.Provider>;
};

export default StateProvider;
