


export type ValueProp = {
  setProjectData: React.Dispatch<React.SetStateAction<ProjectDetails[]>>;
  ProjectsData: ProjectDetails[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  livestreamData: any;
  setLiveStreamData: React.Dispatch<any>;
  currentStream: any;
  setCurrentStream: React.Dispatch<any>;
};


export type ProjectDetails = {
    identifier: string;
    id: number;
    title: string;
    description: string;
    image_url: string;
}