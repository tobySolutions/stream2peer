import { useState } from "react";
import { ProjectDetails } from "../../state/types";
import { deleteProject, updateProject } from "../../network/projects/projects";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../modal";
import { toast } from "react-toastify";
import { useAppStore } from "../../state";
import { Loader } from "../Loader";
import { formatDate } from "../../utils/utils";

const ProjectCard = ({ project }: { project: ProjectDetails }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: project.title,
    desc: project.description,
  });

  const setLoading = useAppStore((state) => state.setLoading);

  const handleDeleteProject = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteProject(id);
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      toast.success("Project deleted successfully");
      window.location.reload();
    } catch (error: any) {
      setDeleteLoading(false);
      if(error?.response) {
        toast.error(error?.response?.data?.message)
      }else {
        toast.error(error?.message);
      }
    }
  };

  const handleProjectUpdate = async () => {
    setLoading(true);
    try {
      await updateProject(project.identifier, {
        title: projectDetails.title,
        description: projectDetails.desc,
      });
      setEditModalOpen(false);
      toast.success("Project updated successfully");
      window.location.reload();
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const DeleteModalContent = () => (
    <div className="flex gap-6 items-center">
      <button
        className="py-2 px-4 rounded-md bg-destructive dark:text-primary-white text-white"
        onClick={() => handleDeleteProject(project.identifier)}
      >
        {isDeleteLoading ? (
          <Loader variant="small"/>
        ) : (
          "YES"
        )}
      </button>
      <button
        className="py-2 px-4 rounded-md bg-[#6C757D] dark:text-primary-white text-white"
        onClick={() => setDeleteModalOpen(false)}
      >
        NO
      </button>
    </div>
  );

  const EditModalContent = () => (
    <div>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">
          Project Title
        </label>
        <input
          type="text"
          className="w-full h-12 rounded-md p-4 mt-2 border border-gray-600 focus:outline-none focus:border-gray-800"
          value={projectDetails.title}
          onChange={(e) =>
            setProjectDetails((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Project Description
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md p-4 mt-2 border border-gray-600 focus:outline-none focus:border-gray-800"
          value={projectDetails.desc}
          onChange={(e) =>
            setProjectDetails((prev) => ({ ...prev, desc: e.target.value }))
          }
        />
      </div>
    </div>
  );

  return (
    <div className="cursor-pointer bg-primary dark:bg-[#1e1e1e] rounded-lg p-6 shadow-md transition-shadow border border-primary-border min-h-[130px] duration-300 hover:shadow-lg flex flex-col justify-between">
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Are you sure you want to delete?"
      >
        <DeleteModalContent />
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Project Details"
        onSubmit={handleProjectUpdate}
      >
        <EditModalContent />
      </Modal>
      <div className="flex w-full justify-between">
        <h2 className="text-xl text-white dark:text-primary-white font-semibold mb-2 w-64 truncate">
          {project.title}
        </h2>
        <FaRegTrashAlt
          className="cursor-pointer text-[#d74444] dark:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModalOpen(true);
          }}
        />
      </div>
      <div>
        <p className="dark:text-[#fff6ffd1] text-white/90 w-64 truncate">
          {project.description}
        </p>
        <div className="w-full flex justify-between items-center">
          <span className="dark:text-[#fff6ffd1] text-white/90 text-sm">
            Date Created: {formatDate(project?.date_created)}
          </span>
          <button
            className="underline dark:text-[#fff6ffd1] text-sm text-[#1e1e1e] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setEditModalOpen(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
