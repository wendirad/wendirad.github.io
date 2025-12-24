import { useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  Search, 
  Terminal, 
  Cpu, 
  Code2, 
  ChevronRight,
  Filter,
  X,
  Image as ImageIcon
} from 'lucide-react';
import type { Project } from '../../../data_provider/data_provider';
import { useProjectsFilter } from './utils';
import TagFilter from './ui/tag-filter';

interface ProjectsProps {
  projects: Project[];
}

const INITIAL_ROWS = 1;
const COLUMNS_LG = 3;
const INITIAL_PROJECTS_COUNT = INITIAL_ROWS * COLUMNS_LG;

export default function Projects({ projects }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const {
    tagPills,
    filteredProjects,
    activeTags,
    toggleTag,
    searchQuery,
    setSearch,
  } = useProjectsFilter(projects);

  // Reset showAll when filters change
  useEffect(() => {
    setShowAll(false);
  }, [filteredProjects.length, searchQuery, activeTags.size]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeProject) {
      // Prevent scrolling and hide scrollbar
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Prevent layout shift by preserving scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      // Cleanup: restore scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [activeProject]);

  const displayedProjects = showAll 
    ? filteredProjects 
    : filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);
  const hasMore = filteredProjects.length > INITIAL_PROJECTS_COUNT;

  return (
    <>
      <section
        id="projects"
        className="min-h-screen w-full flex items-center px-4 sm:px-6 lg:px-8 py-16 overflow-x-hidden relative"
      >
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-tertiary-light/10 dark:bg-tertiary-dark/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-light/10 dark:bg-secondary-dark/10 blur-[120px] rounded-full" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-light dark:text-text-dark leading-tight">
                  Engineering <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary-light to-secondary-light dark:from-tertiary-dark dark:to-secondary-dark">
                    Visual Intelligence.
                  </span>
                </h1>
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-4 w-full md:w-80">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-light dark:text-secondary-dark group-focus-within:text-tertiary-light dark:group-focus-within:text-tertiary-dark transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search projects..."
                    className="w-full bg-transparent border border-primary-dark dark:border-primary-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-tertiary-light/50 dark:focus:ring-tertiary-dark/50 transition-all placeholder:text-secondary-light dark:placeholder:text-secondary-dark text-text-light dark:text-text-dark"
                    value={searchQuery}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tag Filter */}
            <TagFilter
              tagPills={tagPills}
              activeTags={activeTags}
              toggleTag={toggleTag}
            />
          </header>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <div 
                key={project.id}
                className="group relative bg-bg-light/30 dark:bg-bg-dark/30 border border-primary-light/50 dark:border-primary-dark/50 rounded-3xl overflow-hidden hover:border-tertiary-light/30 dark:hover:border-tertiary-dark/30 transition-all duration-500 flex flex-col"
              >
                {/* Image Preview */}
                <div className="relative h-64 overflow-hidden bg-bg-light dark:bg-bg-dark">
                  {project.image.thumbnail ? (
                    <>
                      <img 
                        src={project.image.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105  group-hover:opacity-100"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-light dark:bg-primary-dark">
                      <ImageIcon className="w-16 h-16 text-secondary-light dark:text-secondary-dark opacity-50" />
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    {project.link.repo && (
                      <a 
                        href={project.link.repo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full border border-white/20 dark:border-black/20 hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white dark:text-black" />
                      </a>
                    )}
                    {project.link.live && (
                      <a 
                        href={project.link.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full border border-white/20 dark:border-black/20 hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-white dark:text-black" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark group-hover:text-tertiary-light dark:group-hover:text-tertiary-dark transition-colors mb-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Bottom Section - Tech Stack and Button */}
                  <div className="mt-auto pt-6 space-y-4">
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tools.slice(0, 2).map(tool => (
                        <span key={tool} className="px-3 py-1 bg-bg-light dark:bg-bg-dark rounded-md text-xs text-gray-900 dark:text-gray-100 flex items-center gap-1.5 border border-secondary-light/50 dark:border-secondary-dark/50">
                          <Terminal className="w-3 h-3 text-tertiary-light dark:text-tertiary-dark" />
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 2 && (
                        <span className="px-3 py-1 bg-bg-light dark:bg-bg-dark rounded-md text-xs text-gray-700 dark:text-gray-300 border border-secondary-light/50 dark:border-secondary-dark/50">
                          +{project.tools.length - 2} more
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={() => setActiveProject(project)}
                      className="w-full py-4 px-6 bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 border border-primary-light dark:border-primary-dark rounded-2xl flex items-center justify-between group/btn transition-all"
                    >
                      <span className="text-xs font-semibold text-text-light dark:text-text-dark">View Details</span>
                      <ChevronRight className="w-4 h-4 text-secondary-light dark:text-secondary-dark group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              {!showAll ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-4 bg-bg-light/50 dark:bg-bg-dark/50 hover:bg-bg-light dark:hover:bg-bg-dark border border-primary-light dark:border-primary-dark rounded-2xl text-text-light dark:text-text-dark font-semibold transition-all hover:border-tertiary-light dark:hover:border-tertiary-dark"
                >
                  Show More Projects ({filteredProjects.length - INITIAL_PROJECTS_COUNT} more)
                </button>
              ) : (
                <button
                  onClick={() => setShowAll(false)}
                  className="px-8 py-4 bg-bg-light/50 dark:bg-bg-dark/50 hover:bg-bg-light dark:hover:bg-bg-dark border border-primary-light dark:border-primary-dark rounded-2xl text-text-light dark:text-text-dark font-semibold transition-all hover:border-tertiary-light dark:hover:border-tertiary-dark"
                >
                  Show Less
                </button>
              )}
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <div className="inline-flex p-4 rounded-full bg-bg-light dark:bg-bg-dark border border-primary-light dark:border-primary-dark mb-4">
                <Search className="w-8 h-8 text-secondary-light dark:text-secondary-dark" />
              </div>
              <h3 className="text-xl font-medium text-secondary-light dark:text-secondary-dark">No projects match your filter</h3>
              <p className="text-secondary-light dark:text-secondary-dark mt-2 opacity-70">Try adjusting your search or category</p>
            </div>
          )}
        </main>
      </section>

      {/* Project Modal (Detailed View) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          />
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-bg-light dark:bg-bg-dark border border-primary-light dark:border-primary-dark rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
            <button 
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-text-light dark:text-text-dark" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 flex-1 min-h-0">
              {/* Left Sidebar Info */}
              <div className="lg:col-span-2 overflow-y-auto modal-scrollbar bg-primary-light/50 dark:bg-primary-dark/50 border-b lg:border-b-0 lg:border-r border-primary-light dark:border-primary-dark flex flex-col">
                <div className="p-8 lg:p-12 flex-1 flex flex-col">
                    <div>
                      <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2 leading-tight">
                        {activeProject.title}
                      </h2>
                      <div className="h-1 w-12 bg-tertiary-light dark:bg-tertiary-dark rounded-full" />
                    </div>

                    <div className="space-y-6 mt-8">
                      <section>
                        <h4 className="text-xs font-bold text-secondary-light dark:text-secondary-dark uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5" /> Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tools.map(tool => (
                            <span key={tool} className="px-3 py-1.5 bg-bg-light dark:bg-bg-dark text-gray-900 dark:text-gray-100 rounded-lg text-xs border border-tertiary-light/20 dark:border-tertiary-dark/20 font-medium">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold text-secondary-light dark:text-secondary-dark uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Filter className="w-3.5 h-3.5" /> Domain Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark rounded-lg text-xs border border-primary-light dark:border-primary-dark">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                    <div className="mt-auto pt-8 space-y-4">
                      {activeProject.link.repo && (
                        <a 
                          href={activeProject.link.repo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 w-full py-4 bg-white dark:bg-text-dark text-bg-light dark:text-bg-dark font-bold rounded-2xl hover:bg-tertiary-light dark:hover:bg-tertiary-dark transition-colors"
                        >
                          <Github className="w-5 h-5" /> Repository
                        </a>
                      )}
                      {activeProject.link.live && (
                        <a 
                          href={activeProject.link.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 w-full py-4 bg-white dark:bg-primary-dark text-text-light dark:text-text-dark font-bold rounded-2xl hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3 bg-bg-light dark:bg-bg-dark flex flex-col min-h-0">
                  {activeProject.image.thumbnail && (
                    <div className="overflow-hidden border-x border-t border-primary-light dark:border-primary-dark flex-shrink-0">
                      <img 
                        src={activeProject.image.thumbnail} 
                        alt="Banner" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="overflow-y-auto no-scrollbar flex-1 min-h-0 px-8 lg:px-12 py-8 lg:py-12 space-y-12">

                  <section className="space-y-6">
                    <h3 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-3">
                      <Code2 className="w-6 h-6 text-tertiary-light dark:text-tertiary-dark" /> 
                      Project Overview
                    </h3>
                    <p className="text-secondary-light dark:text-secondary-dark text-lg leading-relaxed">
                      {activeProject.description}
                    </p>
                  </section>

                  {/* GALLERY SECTION */}
                  {activeProject.image.gallery && activeProject.image.gallery.length > 0 && (
                    <section className="space-y-6">
                      <h3 className="text-xs font-bold text-secondary-light dark:text-secondary-dark uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Gallery
                      </h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x gallery-scrollbar">
                        {activeProject.image.gallery.map((img, idx) => (
                          <div key={idx} className="flex-none w-80 h-48 overflow-hidden border border-primary-light dark:border-primary-dark snap-center bg-primary-light dark:bg-primary-dark">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

