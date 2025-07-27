import React, { useState, useEffect } from "react";
import { Code, TrendingUp, Users, Award } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { skillsAPI, aboutAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const AboutPage = () => {
  const { profile, loading: profileLoading, error: profileError } = useAppContext();
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [aboutLoading, setAboutLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [aboutError, setAboutError] = useState(null);
  const [skillsError, setSkillsError] = useState(null);

  // Load about and skills data
  useEffect(() => {
    const loadData = async () => {
      try {
        const aboutData = await aboutAPI.get();
        setAbout(aboutData);
        setAboutLoading(false);
      } catch (err) {
        setAboutError('Failed to load about information');
        setAboutLoading(false);
      }

      try {
        const skillsData = await skillsAPI.getAll();
        setSkills(skillsData);
        setSkillsLoading(false);
      } catch (err) {
        setSkillsError('Failed to load skills');
        setSkillsLoading(false);
      }
    };

    loadData();
  }, []);

  if (profileLoading || aboutLoading) {
    return (
      <div className="bg-[#fffef2] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading about information..." />
      </div>
    );
  }

  if (profileError || aboutError) {
    return (
      <div className="bg-[#fffef2] min-h-screen flex items-center justify-center">
        <ErrorMessage message={profileError || aboutError} />
      </div>
    );
  }

  const highlights = [
    {
      icon: Code,
      title: "Problem Solver",
      description: "I approach every data challenge with curiosity and systematic thinking"
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "Continuously learning new tools and techniques to stay ahead in the field"
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Experience working in startup environments with cross-functional teams"
    },
    {
      icon: Award,
      title: "Results Driven",
      description: "Focused on delivering actionable insights that drive business decisions"
    }
  ];

  const journey = [
    {
      period: "Present",
      title: "Data Analyst",
      description: "Specializing in business intelligence and data visualization"
    },
    {
      period: "2023",
      title: "Minerva Infotech",
      description: "Hands-on experience with real business data in a startup environment"
    },
    {
      period: "Learning",
      title: "Continuous Growth",
      description: "Coding Ninjas, Udemy courses, and LeetCode problem solving"
    }
  ];

  return (
    <div className="bg-[#fffef2] min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 
                className="text-4xl lg:text-5xl font-normal text-[#333333]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                About Me
              </h1>
              <p 
                className="text-xl text-[#666666] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {about?.summary || "I'm a data professional who brings clarity from complexity – using analysis, technology, and a designer's sense of presentation."}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-20 bg-[#f6f5e8]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              What Drives Me
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-[#fffef2] p-8 border border-[#ebeade] hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#f6f5e8] flex items-center justify-center">
                      <IconComponent size={24} className="text-[#333333]" />
                    </div>
                    <h3 
                      className="text-lg font-medium text-[#333333]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {highlight.title}
                    </h3>
                    <p 
                      className="text-[#666666] text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {highlight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              My Journey
            </h2>
          </div>

          <div className="space-y-12">
            <div className="prose prose-lg max-w-none">
              <p 
                className="text-lg text-[#666666] leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {about.experience}
              </p>
              <p 
                className="text-lg text-[#666666] leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {about.learning}
              </p>
              <p 
                className="text-lg text-[#666666] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {about.passion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#f6f5e8]">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Professional Timeline
            </h2>
          </div>

          <div className="space-y-8">
            {journey.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="md:w-32 flex-shrink-0">
                  <span 
                    className="text-sm font-medium text-[#333333] bg-[#fffef2] px-4 py-2 border border-[#ebeade]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-xl font-medium text-[#333333] mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-[#666666]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Detailed */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-normal text-[#333333] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Technical Skills
            </h2>
            <p 
              className="text-lg text-[#666666] max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A comprehensive toolkit for data analysis and visualization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-[#f6f5e8] p-6 border border-[#ebeade] hover:bg-[#ebeade] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="text-lg font-medium text-[#333333]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {skill.name}
                  </h3>
                  <span className="text-xl">{skill.icon}</span>
                </div>
                <div className="w-full bg-[#bcbbb4] h-2 mb-2">
                  <div 
                    className="h-2 bg-[#333333] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <span 
                  className="text-sm text-[#666666] capitalize"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;