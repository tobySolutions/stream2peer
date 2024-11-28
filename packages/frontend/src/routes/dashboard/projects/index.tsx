import ProjectCard from "../../../lib/components/projectsCard";
import { IoAddSharp } from "react-icons/io5";
import Layout from "../layout";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "../../../lib/modal";
import { useEffect, useState } from "react";
import {
  AddProject,
  FetchAllProjects,
} from "../../../network/projects/projects";
import { ImFilesEmpty } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "../../../state";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { EmptyCard } from "../../../lib/components/emptyCard";

function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState({ title: "", desc: "" });
  const [emails, setEmails] = useState<string[]>([]);
  const [inputEmail, setInputEmail] = useState("");
  const [projectingLoading, setProjectLoading] = useState(false);
  const [InputError, setInputError] = useState({ title: "", desc: "" });
  const setProjectData = useAppStore((state) => state.setProjectData);
  const ProjectsData = useAppStore((state) => state.projectsData);
  const setLoading = useAppStore((state) => state.setLoading);

  let navigate = useNavigate();

  const getAllProjects = async () => {
    setProjectLoading(true);
    try {
      const res = await FetchAllProjects();
      setProjectData(res?.results?.data);
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
    setProjectLoading(false);
  };

  const addNewProject = async () => {
    setLoading(true);
    try {
      if (projectDetails.title.length < 5 || projectDetails.title.length > 10) {
        setInputError({
          ...InputError,
          title: "Title must me greater than 4 characters and less than 10",
        });
        setLoading(false);
        return;
      }
      if (projectDetails.desc.length > 1000) {
        setInputError({
          ...InputError,
          title: "Description must not be greater than 1000 characters",
        });
        return;
      }
      if (emails.length > 0) {
        const res = await AddProject({
          title: projectDetails.title,
          description: projectDetails.desc,
          inviteeId: emails.toString(),
        });

        toast.success("Project added successfully");
      } else {
        const res = await AddProject({
          title: projectDetails.title,
          description: projectDetails.desc,
        });

        toast.success("Project added successfully");
      }
      // setProjectData(res?.results?.data);
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
    setLoading(false);
    setModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleAddEmail = (e: any) => {
    e.preventDefault();
    if (inputEmail && emails.length < 3 && validateEmail(inputEmail)) {
      setEmails([...emails, inputEmail]);
      setInputEmail("");
    }
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const validateEmail = (email: string) => {
    // Simple email validation using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={addNewProject}
        children={
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="text-dark-gray">
                Project Title
              </label>
              <input
                type="text"
                className="w-full h-12 focus:outline-none focus:border-gray-800 rounded-md p-4 mt-2 border border-gray-600 "
                onChange={(e) => {
                  setProjectDetails({
                    ...projectDetails,
                    title: e.target.value,
                  });
                  setInputError({ desc: "", title: "" });
                }}
                value={projectDetails.title}
              />
              {InputError.title && (
                <span className="text-destructive">{InputError.title}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="text-dark-gray">
                Project Description
              </label>
              <textarea
                rows={4}
                className="w-full focus:outline-none focus:border-gray-800  rounded-md p-4 mt-2 border border-gray-600 "
                onChange={(e) => {
                  setProjectDetails({
                    ...projectDetails,
                    desc: e.target.value,
                  });
                  setInputError({ desc: "", title: "" });
                }}
                value={projectDetails.desc}
              />
              {InputError.desc && (
                <span className="text-destructive">{InputError.title}</span>
              )}
            </div>
            <form onSubmit={handleAddEmail} className="relative">
              <label
                htmlFor="email-input"
                className="block mb-2 text-dark-gray"
              >
                Invite users via email
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="email-input"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="flex-grow border border-gray-600 rounded-md py-2 pl-3 pr-[150px] mr-2 focus:outline-none focus:border-gray-800"
                  placeholder="Enter email"
                  disabled={emails.length >= 3}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-white py-2 px-4 rounded-md disabled:bg-gray-400"
                  disabled={
                    emails.length >= 3 ||
                    !inputEmail ||
                    !validateEmail(inputEmail)
                  }
                >
                  Add
                </button>
                <div className="absolute right-[68px] top-19 h-[41px] w-36">
                  <Select
                    options={[
                      { label: "Co-host", value: "co-host" },
                      { label: "subscriber", value: "subscriber" },
                    ]}
                    placeholder="Select user role"
                    className="h-full border-gray-600 rounded-md hover:border-gray-800 focus:outline-none focus:border-gray-800 w-full"
                  />
                </div>
              </div>
              {emails.length >= 3 && (
                <p className="text-red-500 text-sm mt-1">
                  You can only add up to 3 emails.
                </p>
              )}
            </form>

            <div className="mt-4">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span className="text-[14px]">{email}</span>
                  <button
                    onClick={() => handleDeleteEmail(email)}
                    className="text-destructive hover:text-destructive/90 font-bold"
                  >
                    <FaRegTrashCan />
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
        title="Add new Project"
      />
      <div className="container p-0 md:p-4">
        <div className="flex w-full items-center justify-between flex-wrap gap-2">
          <p className="text-primary-white text-[32px]">Projects</p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-dark-gray flex items-center gap-1 text-white px-4 py-2 rounded hover:bg-dark-gray border border-primary-border text-[13px] md:text-[14px] transition"
          >
            <IoAddSharp size={18} /> Add New Project
          </button>
        </div>
        {projectingLoading ? (
          <div className="grid place-content-center h-[calc(100vh-400px)]">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#FFFFFF]"></div>
          </div>
        ) : ProjectsData?.length === 0 ? (
          <div className="w-full flex justify-center">
            <EmptyCard
              icon={<ImFilesEmpty size={40} />}
              text="No projects added yet."
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {ProjectsData?.map((project) => (
              <div
                key={project.id}
                className=""
                onClick={() =>
                  navigate(`/dashboard/projects/${project.identifier}`)
                }
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Projects;
