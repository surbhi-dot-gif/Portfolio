import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#fffef2] border-b border-[#bcbbb4] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="text-xl font-normal text-[#333333] hover:text-[#000000] transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Surabhi Priya
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-[#333333]"
                    : "text-[#666666] hover:text-[#333333]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#333333]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#333333] hover:text-[#000000] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#bcbbb4] bg-[#fffef2]">
            <nav className="py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-[#333333] bg-[#f6f5e8]"
                      : "text-[#666666] hover:text-[#333333] hover:bg-[#f6f5e8]"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;