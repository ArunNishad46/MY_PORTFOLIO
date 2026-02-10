import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Projects = ({ projects }) => {
  const projectsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
      },
      { threshold: 0.1 }
    );
    if (projectsRef.current) observer.observe(projectsRef.current);
    return () => { if (projectsRef.current) observer.unobserve(projectsRef.current); };
  }, []);

  return (
    <section
      id="projects"
      className={`py-20 lg:py-28 px-6 lg:px-12 relative transition-colors duration-500 ${colors.bg}`}
      ref={projectsRef}
    >
      <div
        className={`max-w-350 mx-auto transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7.5'}`}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`text-sm font-semibold ${colors.accentText} tracking-[4px] uppercase`}>
            My Work
          </span>
          <h2 className={`text-4xl lg:text-5xl font-black ${colors.text} mt-3`}>
            Featured Projects
          </h2>
          <div className={`w-20 h-1 mx-auto mt-4 rounded-full`}
            style={{ backgroundColor: colors.accent }} />
          <p className={`text-base ${colors.textMuted} mt-4 max-w-lg mx-auto`}>
            Here are a few projects I've worked on recently
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${colors.bgCard} border ${colors.border} rounded-2xl overflow-hidden transition-all duration-500 
                group relative`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 25px 50px ${colors.shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div className="relative w-full h-48 lg:h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4 
                  opacity-0 transition-all duration-400 group-hover:opacity-100">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 ${colors.accentBg} text-black flex items-center justify-center 
                      rounded-xl transition-all duration-300 hover:scale-110 no-underline`}
                    style={{ boxShadow: `0 4px 15px ${colors.accent}50` }}
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 ${colors.accentBg} text-black flex items-center justify-center 
                      rounded-xl transition-all duration-300 hover:scale-110 no-underline`}
                    style={{ boxShadow: `0 4px 15px ${colors.accent}50` }}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold 
                  ${colors.accentBg} text-black`}>
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold ${colors.text} mb-3 transition-colors duration-300 
                  flex items-center gap-2`}>
                  {project.title}
                  <ArrowRight size={16} className={`${colors.accentText} opacity-0 -translate-x-2 
                    group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} />
                </h3>
                <p className={`text-sm leading-relaxed ${colors.textSecondary} mb-4 line-clamp-2`}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 ${colors.accentBgLight} border ${colors.border} ${colors.accentText} 
                        text-xs font-semibold rounded-lg transition-all duration-300`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;



