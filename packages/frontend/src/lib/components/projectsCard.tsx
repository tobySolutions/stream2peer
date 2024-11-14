import React, { useContext, useState } from "react";
import { ProjectDetails } from "../../context/types";
import {
  deleteProject,
  FetchProjectById,
  updateProject,
} from "../../network/projects/projects";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../modal";
import { toast } from "react-toastify";
import { StateContext } from "../../context";

const ProjectCard = ({ project }: { project: ProjectDetails }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState<{
    title: string;
    desc: string;
  }>({ title: project?.title, desc: project?.description });


  const {setLoading} = useContext(StateContext);

  const handleDeleteProject = async (id: string) => {
    setDeleteLoading(true);
    try {
      const res = await deleteProject(id);
      console.log(res);
      setDeleteLoading(false);
      setOpenDeleteModal(false);
      window.location.reload();
      setTimeout(() => {
        toast.success("Project deleted successfully");
      }, 300);
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
    }
  };

  const handleProjectUpdate = async () => {
    setLoading(true);
    try {
      const res = await updateProject(project.identifier, {
        title: projectDetails?.title,
        description: projectDetails?.desc,
      });
      console.log(res);
      setOpenEditModal(false);
      window.location.reload();
      setTimeout(() => {
        toast.success("Project deleted successfully");
      }, 300);
    } catch (error) {}
    setLoading(false);
  };

  const DeleteModalContent = () => {
    return (
      <div className="flex gap-6 items-center">
        <button
          className="py-2 px-4 rounded-md bg-[#FF4C4C] text-primary-white"
          onClick={() => handleDeleteProject(project.identifier)}
        >
          {deleteloading ? (
            <div className="grid place-content-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#FFFFFF]"></div>
            </div>
          ) : (
            "YES"
          )}
        </button>
        <button
          className="py-2 px-4 rounded-md bg-[#6C757D] text-primary-white"
          onClick={() => setOpenDeleteModal(false)}
        >
          NO
        </button>
      </div>
    );
  };

  const EditModalContent = () => {
    return (
      <div>
        <div className="mb-4">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            className="w-full h-12 focus:outline-none focus:border-gray-800 rounded-md p-4 mt-2 border border-gray-600 "
            onChange={(e) =>
              setProjectDetails({
                ...projectDetails,
                title: e.target.value,
              })
            }
            value={projectDetails?.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title">Project Description</label>
          <textarea
            rows={4}
            className="w-full focus:outline-none focus:border-gray-800  rounded-md p-4 mt-2 border border-gray-600 "
            onChange={(e) =>
              setProjectDetails({
                ...projectDetails,
                desc: e.target.value,
              })
            }
            value={projectDetails?.desc}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="block cursor-pointer bg-dark-gray rounded-lg p-6 shadow-md transition-shadow border border-primary-border duration-300 hover:shadow-lg">
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        children={<DeleteModalContent />}
        title="Are you sure you want to delete?"
      />
      <Modal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        children={<EditModalContent />}
        title="Edit Project Details"
        onSubmit={handleProjectUpdate}
      />
      {/* <div>
        <img src={project?.image_url} alt="" className='h-12 w-full' />
      </div> */}
      <div className="flex w-full justify-between">
        <h2 className="text-xl text-primary-white font-semibold mb-2 w-64 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {project.title}
        </h2>
        <FaRegTrashAlt
          color="#d56a7f"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeleteModal(true);
          }}
        />
      </div>

      <p className="text-[#fff6ffd1] w-64 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.description}
      </p>
      <div className="w-full flex justify-between">
        <span className="text-[#fff6ffd1] text-sm">
          Date Created: 12/06/2024
        </span>
        <p
          className="underline text-[#fff6ffd1] cursor-pointer text-[14px]"
          onClick={(e) => {
            e.stopPropagation();
            setOpenEditModal(true);
          }}
        >
          Edit
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
