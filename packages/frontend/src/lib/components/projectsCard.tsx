import React, { useState } from "react";
import { ProjectDetails } from "../../state/types";
import { deleteProject, updateProject } from "../../network/projects/projects";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../modal";
import { toast } from "react-toastify";
import { useAppStore } from "../../state";

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
      window.location.reload();
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
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
      window.location.reload();
      toast.success("Project updated successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteModalContent = () => (
    <div className="flex gap-6 items-center">
      <button
        className="py-2 px-4 rounded-md bg-destructive text-primary-white"
        onClick={() => handleDeleteProject(project.identifier)}
      >
        {isDeleteLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#FFFFFF]" />
        ) : (
          "YES"
        )}
      </button>
      <button
        className="py-2 px-4 rounded-md bg-[#6C757D] text-primary-white"
        onClick={() => setDeleteModalOpen(false)}
      >
        NO
      </button>
    </div>
  );

  const EditModalContent = () => (
    <div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm mb-2">
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
        <label htmlFor="description" className="block text-sm mb-2">
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
    <div className="block cursor-pointer bg-dark-gray rounded-lg p-6 shadow-md transition-shadow border border-primary-border duration-300 hover:shadow-lg">
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
        <h2 className="text-xl text-primary-white font-semibold mb-2 w-64 truncate">
          {project.title}
        </h2>
        <FaRegTrashAlt
          color="#d56a7f"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModalOpen(true);
          }}
        />
      </div>
      <p className="text-[#fff6ffd1] w-64 truncate">{project.description}</p>
      <div className="w-full flex justify-between items-center">
        <span className="text-[#fff6ffd1] text-sm">
          Date Created: 12/06/2024
        </span>
        <button
          className="underline text-[#fff6ffd1] text-sm cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setEditModalOpen(true);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
