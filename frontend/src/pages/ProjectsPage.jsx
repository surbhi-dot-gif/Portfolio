import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { projectsAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const projectsData = await projectsAPI.getAll();
        setProjects(projectsData);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fffef2] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading projects..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fffef2] min-h-screen flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-[#fffef2] min-h-screen">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl lg:text-5xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              My Projects
            </h1>
            <p 
              className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Each project represents a journey from raw data to actionable insights. 
              Here's how I've helped solve real-world business challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-6">
                    <h2 
                      className="text-3xl font-normal text-[#333333]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {project.title}
                    </h2>
                    <p 
                      className="text-lg text-[#666666] leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 
                        className="text-sm font-medium text-[#333333] mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        PROBLEM SOLVED
                      </h3>
                      <p 
                        className="text-[#666666]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {project.problem}
                      </p>
                    </div>
                    
                    <div>
                      <h3 
                        className="text-sm font-medium text-[#333333] mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        IMPACT ACHIEVED
                      </h3>
                      <p 
                        className="text-[#666666]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-4 py-2 bg-[#f6f5e8] text-[#4a4a4a] text-sm border border-[#bcbbb4] font-medium"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center px-8 py-4 bg-transparent border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-[#fffef2] transition-all duration-200 text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    View Case Study
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="bg-[#f6f5e8] p-12 border border-[#ebeade] aspect-square flex items-center justify-center">
                    <div className="text-8xl opacity-60">{project.visual}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#fffef2] max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-start mb-8">
                <h2 
                  className="text-3xl font-normal text-[#333333]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeProjectModal}
                  className="text-[#666666] hover:text-[#333333] text-2xl font-light"
                >
                  ×
                </button>
              </div>

              <div className="space-y-8">
                <div className="text-6xl text-center py-8">{selectedProject.visual}</div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 
                      className="text-lg font-medium text-[#333333] mb-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      The Challenge
                    </h3>
                    <p 
                      className="text-[#666666]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {selectedProject.problem}
                    </p>
                  </div>
                  
                  <div>
                    <h3 
                      className="text-lg font-medium text-[#333333] mb-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      My Approach
                    </h3>
                    <p 
                      className="text-[#666666]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {selectedProject.solution}
                    </p>
                  </div>
                  
                  <div>
                    <h3 
                      className="text-lg font-medium text-[#333333] mb-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      The Results
                    </h3>
                    <p 
                      className="text-[#666666]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {selectedProject.impact}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 
                    className="text-lg font-medium text-[#333333] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-4 py-2 bg-[#f6f5e8] text-[#4a4a4a] text-sm border border-[#bcbbb4] font-medium"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-8">
                  <button className="inline-flex items-center px-6 py-3 bg-transparent border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-[#fffef2] transition-all duration-200 text-sm font-medium">
                    <Github size={16} className="mr-2" />
                    View Code
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-transparent border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-[#fffef2] transition-all duration-200 text-sm font-medium">
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;