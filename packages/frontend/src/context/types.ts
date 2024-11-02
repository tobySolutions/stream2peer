


export type ValueProp = {
  setProjectData: React.Dispatch<React.SetStateAction<ProjectDetails[]>>;
  ProjectsData: ProjectDetails[];
};


export type ProjectDetails = {
    identifier: string;
    id: number;
    title: string;
    description: string;
    image_url: string;
}