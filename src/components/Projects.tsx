import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.name}
              </h3>
              <p className="text-gray-700 mb-4 flex-1 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-medium rounded bg-primary-100 text-primary-800"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-medium rounded bg-gray-200 text-gray-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Repository →
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

