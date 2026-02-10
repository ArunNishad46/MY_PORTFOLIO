import React, { useEffect, useRef, useState } from 'react';
import {Icons} from "../icons";
import { useTheme } from '../context/ThemeContext';

const Skills = ({ skills }) => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
      },
      { threshold: 0.1 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => { if (skillsRef.current) observer.unobserve(skillsRef.current); };
  }, []);

  return (
    <section
      id="skills"
      className={`py-20 lg:py-28 px-6 lg:px-12 relative transition-colors duration-500 ${colors.bgSecondary}`}
      ref={skillsRef}
    >
      <div
        className={`max-w-350 mx-auto transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7.5'}`}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`text-sm font-semibold ${colors.accentText} tracking-[4px] uppercase`}>
            What I Use
          </span>
          <h2 className={`text-4xl lg:text-5xl font-black ${colors.text} mt-3`}>
            Skills & Technologies
          </h2>
          <div className={`w-20 h-1 mx-auto mt-4 rounded-full`}
            style={{ backgroundColor: colors.accent }} />
          <p className={`text-base ${colors.textMuted} mt-4 max-w-lg mx-auto`}>
            Technologies I've been working with recently to build amazing projects
          </p>
        </div>

        {/* Skills Grid - 4 columns on desktop, 3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {skills.map((skill, index) => {
            const IconComponent = Icons[skill.icon];
            return (
              <div
                key={index}
                className={`${colors.bgCard} border ${colors.border} rounded-xl p-5 lg:p-6 flex flex-col items-center gap-3 
                  transition-all duration-400 cursor-pointer group relative overflow-hidden`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 50}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${colors.shadowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                  style={{
                    background: `radial-gradient(circle at center, ${colors.accent}08, transparent 70%)`
                  }}
                />

                <div className={`${colors.accentText} transition-all duration-400 relative z-10
                  group-hover:scale-110`}
                  style={{
                    filter: isDark ? 'none' : 'none'
                  }}
                >
                  <IconComponent size={36} />
                </div>
                <div className={`text-sm lg:text-base font-semibold ${colors.text} text-center relative z-10
                  transition-colors duration-300`}>
                  {skill.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;



