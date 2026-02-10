import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Education = ({ education }) => {
  const eduRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
      },
      { threshold: 0.1 }
    );
    if (eduRef.current) observer.observe(eduRef.current);
    return () => { if (eduRef.current) observer.unobserve(eduRef.current); };
  }, []);

  return (
    <section
      id="education"
      className={`py-20 lg:py-28 px-6 lg:px-12 relative transition-colors duration-500 ${colors.bgSecondary}`}
      ref={eduRef}
    >
      <div
        className={`max-w-350 mx-auto transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7.5'}`}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`text-sm font-semibold ${colors.accentText} tracking-[4px] uppercase`}>
            Academic Background
          </span>
          <h2 className={`text-4xl lg:text-5xl font-black ${colors.text} mt-3`}>
            Education
          </h2>
          <div className={`w-20 h-1 mx-auto mt-4 rounded-full`}
            style={{ backgroundColor: colors.accent }} />
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`${colors.bgCard} border ${colors.border} rounded-2xl p-6 lg:p-8 
                transition-all duration-400 relative overflow-hidden group`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 150}ms`,
                transition: 'all 0.6s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${colors.shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 
                opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: colors.accent }} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${colors.accentBgLight} flex items-center justify-center mb-5
                transition-all duration-300 group-hover:scale-110`}>
                <GraduationCap size={24} className={colors.accentText} />
              </div>

              {/* Duration */}
              <div className={`inline-flex items-center gap-1.5 ${colors.accentText} text-sm font-semibold mb-3`}>
                <Calendar size={14} />
                {edu.duration}
              </div>

              {/* Degree */}
              <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                {edu.degree}
              </h3>

              {/* Institution */}
              <p className={`${colors.textSecondary} text-sm font-medium mb-3`}>
                {edu.institution}
              </p>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${colors.textMuted} mb-4`}>
                {edu.description}
              </p>

              {/* Grade Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                ${colors.accentBgLight} ${colors.accentText} text-sm font-bold`}>
                <Award size={14} />
                {edu.grade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;