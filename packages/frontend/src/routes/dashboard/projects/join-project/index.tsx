import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProjectById } from "../../../../network/projects/projects";
import { toast } from "react-toastify";

export const JoinProject = () => {
  const { id: projectId } = useParams();
  const [projectLoading, setProjectLoading] = useState(false);
  const [ProjectData, setProjectData] = useState<null | any>(null);
  const [joiningProject, setJoiningProject] = useState(false);


  useEffect(() => {
    handlegetProjectDetails();
  }, []);

  const handlegetProjectDetails = async () => {
    setProjectLoading(true);
    try {
      const res = await FetchProjectById(projectId!);

      setProjectData(res.results);
    } catch (err: any) {
       if (err?.response?.data?.message) {
         toast.error(err?.response?.data?.message);
       } else {
         toast.error(err?.message);
       }
    }
    setProjectLoading(false);
  };

  const handleJoinProject = () => {

  }

  return (
    <div className=" bg-dark-gray h-screen w-full flex justify-center items-center">
      <div>
        <h1>You've been invited to collaborate on {ProjectData?.title}</h1>
        Do you accept to join {ProjectData?.title}?
        <div className="flex gap-6 items-center">
          <button
            className="py-2 px-4 rounded-md bg-destructive text-primary-white"
            onClick={() => handleJoinProject()}
          >
            {joiningProject ? (
              <div className="grid place-content-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#FFFFFF]"></div>
              </div>
            ) : (
              "YES"
            )}
          </button>
          <button
            className="py-2 px-4 rounded-md bg-[#6C757D] text-primary-white"
            // onClick={}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};
