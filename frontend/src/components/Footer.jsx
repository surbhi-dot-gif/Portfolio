import React from "react";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: mockData.contact.linkedin,
      icon: Linkedin
    },
    {
      name: "GitHub", 
      href: mockData.contact.github,
      icon: Github
    },
    {
      name: "LeetCode",
      href: mockData.contact.leetcode,
      icon: Code
    },
    {
      name: "Email",
      href: `mailto:${mockData.contact.email}`,
      icon: Mail
    }
  ];

  return (
    <footer className="bg-[#f6f5e8] border-t border-[#bcbbb4]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16">
        <div className="flex flex-col items-center space-y-8">
          <h3 
            className="text-2xl font-normal text-[#333333]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Let's Connect
          </h3>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-[#666666] hover:text-[#333333] transition-colors duration-200 hover:bg-[#ebeade] rounded-full"
                  aria-label={link.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>

          <div className="text-center space-y-2">
            <p 
              className="text-sm text-[#666666]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © 2024 Surabhi Priya. All rights reserved.
            </p>
            <p 
              className="text-xs text-[#bcbbb4]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Built with passion for data and design
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;