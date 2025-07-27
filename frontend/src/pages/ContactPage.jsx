import React, { useState } from "react";
import { Send, Github, Linkedin, Mail, Code, MapPin, Clock } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { contactAPI } from "../services/api";
import { useToast } from "../hooks/use-toast";

const ContactPage = () => {
  const { settings } = useAppContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactAPI.submit(formData);
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: settings?.linkedin || "#",
      icon: Linkedin,
      description: "Connect with me professionally"
    },
    {
      name: "GitHub", 
      href: settings?.github || "#",
      icon: Github,
      description: "View my code and projects"
    },
    {
      name: "LeetCode",
      href: settings?.leetcode || "#",
      icon: Code,
      description: "Check out my coding practice"
    },
    {
      name: "Email",
      href: `mailto:${settings?.email || "contact@example.com"}`,
      icon: Mail,
      description: "Send me a direct email"
    }
  ];

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
              Let's Work Together
            </h1>
            <p 
              className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to connect, I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-[#f6f5e8] p-8 lg:p-12 border border-[#ebeade]">
              <h2 
                className="text-2xl font-normal text-[#333333] mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Send me a message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 
                    className="text-xl text-[#333333] mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p 
                    className="text-[#666666]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name"
                        className="block text-sm font-medium text-[#333333] mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#fffef2] border border-[#bcbbb4] text-[#333333] placeholder-[#bcbbb4] focus:outline-none focus:border-[#333333] transition-colors duration-200"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email"
                        className="block text-sm font-medium text-[#333333] mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#fffef2] border border-[#bcbbb4] text-[#333333] placeholder-[#bcbbb4] focus:outline-none focus:border-[#333333] transition-colors duration-200"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#333333] mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#fffef2] border border-[#bcbbb4] text-[#333333] placeholder-[#bcbbb4] focus:outline-none focus:border-[#333333] transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="message"
                      className="block text-sm font-medium text-[#333333] mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#fffef2] border border-[#bcbbb4] text-[#333333] placeholder-[#bcbbb4] focus:outline-none focus:border-[#333333] transition-colors duration-200 resize-vertical"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>
                  
                  <button
                    disabled={isSubmitting}
                    className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-[#fffef2] transition-all duration-200 text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Send Message
                    <Send size={16} className="ml-2" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 
                  className="text-2xl font-normal text-[#333333] mb-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Get in touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-[#666666] mt-1 flex-shrink-0" />
                    <div>
                      <h3 
                        className="text-sm font-medium text-[#333333] mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Location
                      </h3>
                      <p 
                        className="text-[#666666]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {settings?.location || "Available for remote work worldwide"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-[#666666] mt-1 flex-shrink-0" />
                    <div>
                      <h3 
                        className="text-sm font-medium text-[#333333] mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Response Time
                      </h3>
                      <p 
                        className="text-[#666666]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {settings?.responseTime || "Usually within 24 hours"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 
                  className="text-xl font-normal text-[#333333] mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Connect with me
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-[#f6f5e8] border border-[#ebeade] hover:bg-[#ebeade] transition-all duration-200 hover:shadow-md group"
                      >
                        <div className="w-10 h-10 bg-[#fffef2] flex items-center justify-center group-hover:bg-[#f6f5e8] transition-colors duration-200">
                          <IconComponent size={18} className="text-[#333333]" />
                        </div>
                        <div>
                          <h4 
                            className="text-sm font-medium text-[#333333]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {link.name}
                          </h4>
                          <p 
                            className="text-xs text-[#666666]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {link.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#f6f5e8] p-6 border border-[#ebeade]">
                <h3 
                  className="text-lg font-medium text-[#333333] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  What I can help you with
                </h3>
                <ul 
                  className="space-y-2 text-[#666666]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <li>• Data Analysis & Visualization</li>
                  <li>• Business Intelligence Solutions</li>
                  <li>• SQL Database Optimization</li>
                  <li>• Power BI Dashboard Development</li>
                  <li>• Python Data Processing</li>
                  <li>• Excel Automation & Modeling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;