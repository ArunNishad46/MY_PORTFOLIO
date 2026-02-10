import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme, colors } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    // { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-500 ease-in-out
        ${colors.headerBg} backdrop-blur-xl border-b ${colors.border}
        ${isScrolled ? 'shadow-lg' : ''}`}
      style={{
        boxShadow: isScrolled
          ? `0 4px 30px ${colors.shadowColor}`
          : 'none'
      }}
    >
      <div className="max-w-350 mx-auto px-6 py-4 flex items-center justify-between
        lg:px-12">
        {/* Logo */}
        <div
          onClick={() => scrollToSection('home')}
          className={`text-[26px] font-black ${colors.accentText} cursor-pointer transition-all duration-300 tracking-[3px]
            hover:scale-105`}
          style={{
            textShadow: isDark ? `0 0 20px ${colors.accent}40` : 'none'
          }}
        >
          ARUN
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`bg-transparent border-none text-[15px] font-medium cursor-pointer transition-all duration-300 
                px-4 py-2 rounded-lg relative
                ${activeSection === item.id
                  ? `${colors.accentText} ${colors.accentBgLight}`
                  : `${colors.textMuted} hover:${colors.textSecondary}`
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer border-none outline-none
              ${isDark
                ? 'bg-[#1a2332] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_0_15px_rgba(0,255,209,0.2)]'
                : 'bg-[#87CEEB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_0_15px_rgba(255,200,0,0.3)]'
              }`}
            aria-label="Toggle theme"
          >
            {/* Stars (dark mode) */}
            <div className={`absolute top-1.5 right-2 transition-opacity duration-500
              ${isDark ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-1 h-1 bg-white rounded-full absolute top-0 right-0" />
              <div className="w-0.5 h-0.5 bg-white/70 rounded-full absolute top-2 right-3" />
              <div className="w-0.5 h-0.5 bg-white/50 rounded-full absolute top-1 right-5" />
            </div>

            {/* Toggle Circle */}
            <div
              className={`absolute top-0.75 w-5.5 h-5.5 rounded-full transition-all duration-500 flex items-center justify-center
                ${isDark
                  ? 'left-0.75 bg-[#0a0a0a] shadow-[0_0_10px_rgba(0,255,209,0.5)]'
                  : 'left-7.25 bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]'
                }`}
            >
              {isDark ? (
                <Moon size={12} className="text-[#00FFD1]" />
              ) : (
                <Sun size={12} className="text-white" />
              )}
            </div>

            {/* Clouds (light mode) */}
            <div className={`absolute bottom-1 left-1.5 transition-opacity duration-500
              ${isDark ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-3 h-1.5 bg-white/80 rounded-full" />
              <div className="w-2 h-1 bg-white/60 rounded-full ml-1 -mt-0.5" />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden bg-transparent border-none ${colors.text} cursor-pointer p-2 
              transition-all duration-300 rounded-lg ${colors.accentBgLight}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out
        ${isMobileMenuOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className={`flex flex-col ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} border-t ${colors.border} px-6 py-4 gap-1`}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`bg-transparent border-none text-base font-medium cursor-pointer py-3 px-4 text-left 
                transition-all duration-300 rounded-lg
                ${activeSection === item.id
                  ? `${colors.accentText} ${colors.accentBgLight}`
                  : `${colors.textMuted} hover:${colors.text} ${colors.bgCardHover}`
                }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;



