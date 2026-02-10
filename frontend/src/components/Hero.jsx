import React, { useEffect, useRef, useState } from 'react';
import { Download, Mail, ChevronDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useTheme } from '../context/ThemeContext';
import ArunResume from '../assets/arun.pdf';

const Hero = ({ data }) => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => { if (heroRef.current) observer.unobserve(heroRef.current); };
  }, []);

  // Check if layout is side-by-side (lg+) or stacked
  useEffect(() => {
    const checkLayout = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className={`min-h-screen ${colors.bg} flex items-center justify-center pt-20 px-6 relative overflow-hidden
        lg:px-12 transition-colors duration-500`}
      ref={heroRef}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(${colors.accent}20 1px, transparent 1px), 
                           linear-gradient(90deg, ${colors.accent}20 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20 z-0"
        style={{ backgroundColor: colors.accent }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-10 z-0"
        style={{ backgroundColor: colors.accent }} />

      <div
        className={`max-w-350 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 
          relative z-1 transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7.5'}`}
      >
        {/* Text Content */}
        <div className={`flex-1 max-w-150 text-center lg:text-left order-1 
          ${!isDesktop ? 'w-full' : ''}`}>
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 
              border ${colors.border} ${colors.accentBgLight} ${colors.accentText}
              opacity-0 animate-fadeInUp`}
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: colors.accent }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: colors.accent }} />
            </span>
            Available for work
          </div>

          {/* Greeting */}
          <div
            className={`text-xl lg:text-2xl ${colors.accentText} font-medium mb-3 opacity-0 animate-fadeInUp`}
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            {data.greeting}
          </div>

          {/* Name */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-[66px] font-black ${colors.text} leading-[1.1] tracking-tight mb-4 
              opacity-0 animate-fadeInUp`}
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            I'm{' '}
            <span className={colors.accentText} style={{
              textShadow: isDark ? `0 0 40px ${colors.accent}30` : 'none'
            }}>
              {data.name}
            </span>
          </h1>

          {/* Title */}
          <p
            className={`text-xl sm:text-2xl lg:text-[32px] font-semibold ${colors.textSecondary} mb-8 lg:mb-10 
              opacity-0 animate-fadeInUp`}
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
          >
            {data.title}
          </p>

          {/* Buttons */}
          <div
            className="flex gap-4 flex-wrap justify-center lg:justify-start opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
          >
            <button
              onClick={() => window.open(ArunResume, '_blank')}
              className={`${colors.accentBg} text-black border-none rounded-xl px-7 py-3.5 text-base font-bold cursor-pointer 
                transition-all duration-400 inline-flex items-center gap-2.5 group
                hover:-translate-y-1`}
              style={{ boxShadow: `0 8px 30px ${colors.accent}40` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 15px 40px ${colors.accent}60, 0 0 30px ${colors.accent}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 30px ${colors.accent}40`;
              }}
            >
              Download CV
              <Download size={18} className="group-hover:animate-bounce" />
            </button>

            <button
              onClick={scrollToContact}
              className={`${isDark ? 'bg-white/10 text-white border-white/20' : 'bg-gray-900/5 text-gray-900 border-gray-300'} 
                border-2 rounded-xl px-7 py-3.5 text-base font-bold cursor-pointer transition-all duration-400 
                inline-flex items-center gap-2.5 group
                hover:-translate-y-1 hover:shadow-lg`}
            >
              Contact Me
              <Mail size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          {/* <div
            className="flex gap-8 mt-10 justify-center lg:justify-start opacity-0 animate-fadeInUp"
            style={{ animationDelay: '1s', animationFillMode: 'both' }}
          >
            {[
              { number: '4+', label: 'Years Exp.' },
              { number: '20+', label: 'Projects' },
              { number: '15+', label: 'Clients' }
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className={`text-2xl lg:text-3xl font-black ${colors.accentText}`}>{stat.number}</div>
                <div className={`text-xs ${colors.textMuted} font-medium mt-1`}>{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Spline 3D - Only render on desktop (side-by-side layout) */}
        {isDesktop && (
          <div className="flex-1 flex items-center justify-center order-2">
            <div
              className="w-150 h-150 relative overflow-visible transition-all duration-700"
              style={{
                filter: isDark
                  ? 'none'
                  : 'brightness(1.6) contrast(0.85) saturate(0.4)',
              }}
            >
              <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-2 ${colors.accentText} 
          animate-bounce cursor-pointer bg-transparent border-none`}
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default Hero;




