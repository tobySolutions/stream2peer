import React from 'react';

const ProjectCard = ({ project }: any) => {
  return (
    <a
      href={`/dashboard/projects/${project.id}`}
      className="block bg-dark-gray rounded-lg p-6 shadow-md transition-shadow border border-primary-border duration-300 hover:shadow-lg"
    >
      <h2 className="text-xl text-primary-white font-semibold mb-2">
        {project.name}
      </h2>
      <p className="text-[#fff6ffd1]">{project.description}</p>
      <div>
        <span className="text-[#fff6ffd1] text-sm">Date Created: 12/06/2024</span>
      </div>
    </a>
  );
};

export default ProjectCard;