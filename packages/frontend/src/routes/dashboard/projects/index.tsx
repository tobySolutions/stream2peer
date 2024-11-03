import ProjectCard from "../../../lib/components/projectsCard";
import { IoAddSharp } from "react-icons/io5";
import Layout from "../layout";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "../../../lib/modal";
import { useContext, useEffect, useState } from "react";
import { FetchAllProjects } from "../../../network/projects/projects";
import { StateContext } from "../../../context";

function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [inputEmail, setInputEmail] = useState("");
  
  const {setProjectData, ProjectsData} = useContext(StateContext);

  const getAllProjects = async () => {
    try {
      const res = await FetchAllProjects();
      console.log(res);
      setProjectData(res?.results?.data)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const projects = [
    { id: "1", name: "First Project", description: "Lorem Ipsum" },
    { id: "2", name: "First Project", description: "Lorem Ipsum" },
    { id: "3", name: "First Project", description: "Lorem Ipsum" },
    { id: "4", name: "First Project", description: "Lorem Ipsum" },
    { id: "5", name: "First Project", description: "Lorem Ipsum" },
    { id: "6", name: "First Project", description: "Lorem Ipsum" },
  ];

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
        children={
          <div>
            <div className="mb-4">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                className="w-full h-12 focus:outline-none focus:border-gray-800 rounded-md p-4 mt-2 border border-gray-600 "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title">Project Description</label>
              <textarea
                rows={4}
                className="w-full focus:outline-none focus:border-gray-800  rounded-md p-4 mt-2 border border-gray-600 "
              />
            </div>
            <form onSubmit={handleAddEmail}>
              <label htmlFor="email-input" className="block mb-2">
                Invite users via email
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="email-input"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="flex-grow border border-gray-600 rounded-md py-2 px-3 mr-2 focus:outline-none focus:border-gray-800"
                  placeholder="Enter email"
                  disabled={emails.length >= 3}
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-primary-white py-2 px-4 rounded-md disabled:bg-gray-400"
                  disabled={
                    emails.length >= 3 ||
                    !inputEmail ||
                    !validateEmail(inputEmail)
                  }
                >
                  Add
                </button>
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
                    className="text-orange-500 hover:text-orange-700 font-bold"
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
      <div className="container p-4">
        <div className="flex w-full items-center justify-between flex-wrap gap-2">
          <p className="text-primary-white text-[32px]">Projects</p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-dark-gray flex items-center gap-1 text-white px-4 py-2 rounded hover:bg-dark-gray border border-primary-border text-[14px] transition"
          >
            <IoAddSharp size={18} /> Add New Project
          </button>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {ProjectsData?.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;
