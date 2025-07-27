import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { projectsAPI, skillsAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const HomePage = () => {
  const { profile, loading, error } = useAppContext();
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);

  // Load skills and featured projects
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load skills
        const skillsData = await skillsAPI.getAll();
        setSkills(skillsData);
        setSkillsLoading(false);
      } catch (err) {
        setSkillsError('Failed to load skills');
        setSkillsLoading(false);
      }

      try {
        // Load featured projects
        const projectsData = await projectsAPI.getAll({ featured: true, limit: 2 });
        setProjects(projectsData);
        setProjectsLoading(false);
      } catch (err) {
        setProjectsError('Failed to load projects');
        setProjectsLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fffef2] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading portfolio..." />
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

  return (
    <div className="bg-[#fffef2]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 
                  className="text-4xl lg:text-5xl font-normal text-[#333333] leading-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Hi, I'm {profile?.name || "Surabhi Priya"}
                </h1>
                <p 
                  className="text-xl text-[#666666] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {profile?.intro || "I turn raw data into real insights. With hands-on experience in SQL, Excel, and analytics, I help businesses make smarter, data-driven decisions."}
                </p>
                <p 
                  className="text-lg text-[#4a4a4a] italic"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  "{profile.tagline}"
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-[#fffef2] transition-all duration-200 text-sm font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  View My Work
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-[#333333] hover:text-[#000000] text-sm font-normal relative group transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Get In Touch
                  <span className="absolute bottom-2 left-8 right-8 h-px bg-[#333333] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 bg-[#f6f5e8]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Core Expertise
            </h2>
            <p 
              className="text-lg text-[#666666] max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Transforming complex data into actionable insights with these tools
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-[#fffef2] p-6 border border-[#ebeade] hover:shadow-lg transition-all duration-200 hover:transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-center space-y-3">
                  <div className="text-2xl">{skill.icon}</div>
                  <h3 
                    className="text-sm font-medium text-[#333333] group-hover:text-[#000000] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {skill.name}
                  </h3>
                  <div className="w-full bg-[#ebeade] h-1">
                    <div 
                      className="h-1 bg-[#333333] transition-all duration-1000 ease-out"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Featured Projects
            </h2>
            <p 
              className="text-lg text-[#666666] max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Real-world data challenges solved with analytical thinking
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mockData.projects.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="bg-[#f6f5e8] p-8 hover:bg-[#ebeade] transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="space-y-6">
                  <div className="text-4xl mb-4">{project.visual}</div>
                  <h3 
                    className="text-xl font-normal text-[#333333] group-hover:text-[#000000] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="text-[#666666] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-[#fffef2] text-[#4a4a4a] text-xs border border-[#bcbbb4] font-medium"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 text-[#333333] hover:text-[#000000] text-sm font-normal relative group transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View All Projects
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              <span className="absolute bottom-2 left-8 right-8 h-px bg-[#333333] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;