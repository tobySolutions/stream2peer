import ProjectCard from "../../../lib/components/projectsCard";
import { IoAddSharp } from "react-icons/io5";
import Layout from "../layout";

function Projects() {

  const projects = [
    { id: "1", name: "First Project", description: "Lorem Ipsum" },
    { id: "2", name: "First Project", description: "Lorem Ipsum" },
    { id: "3", name: "First Project", description: "Lorem Ipsum" },
    { id: "4", name: "First Project", description: "Lorem Ipsum" },
    { id: "5", name: "First Project", description: "Lorem Ipsum" },
    { id: "6", name: "First Project", description: "Lorem Ipsum" },
  ];
  return (
    <Layout>
      <div className="flex w-full items-center justify-between">
        <p className="text-[#fff6ff] text-[32px]">Projects</p>
        <button className="bg-[#1e1e1e] flex items-center gap-1 text-white px-4 py-2 rounded hover:bg-[#1e1e1e] border border-[hsl(155,6%,42.5%)] text-[14px] transition">
          <IoAddSharp size={18}/> Add New Project
        </button>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </Layout>
  );
}

export default Projects;
