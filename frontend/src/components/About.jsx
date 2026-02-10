import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Twitter, MapPin, Calendar, Briefcase, Folder, FolderGit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = ({ data }) => {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
      },
      { threshold: 0.1 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => { if (aboutRef.current) observer.unobserve(aboutRef.current); };
  }, []);

  const infoCards = [
    { icon: MapPin, label: 'Location', value: 'Noida, India' },
    { icon: FolderGit, label: 'Project', value: '3+ Projects' },
    { icon: Briefcase, label: 'Status', value: 'Open to Work' }
  ];

  return (
    <section
      id="about"
      className={`py-20 lg:py-28 px-6 lg:px-12 relative transition-colors duration-500 ${colors.bg}`}
      ref={aboutRef}
    >
      {/* CSS for rotating text */}
      <style>{`
        @keyframes rotateText {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateTextReverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .rotate-text {
          animation: rotateText 15s linear infinite;
        }
        .rotate-text-reverse {
          animation: rotateTextReverse 20s linear infinite;
        }
        .about-image-wrapper:hover .rotate-text {
          animation-duration: 8s;
        }
        .about-image-wrapper:hover .rotate-text-reverse {
          animation-duration: 10s;
        }
        .about-image-wrapper:hover .profile-img {
          transform: scale(1.08);
          border-color: ${colors.accent};
        }
        .about-image-wrapper:hover .glow-ring {
          opacity: 0.6;
          transform: scale(1.05);
        }
        .about-image-wrapper:hover .outer-ring {
          border-color: ${colors.accent};
          box-shadow: 0 0 40px ${colors.accent}30, inset 0 0 40px ${colors.accent}10;
        }
        .about-image-wrapper:hover .dot-indicator {
          transform: scale(1.5);
          box-shadow: 0 0 20px ${colors.accent};
        }
      `}</style>

      <div
        className={`max-w-350 mx-auto transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7.5'}`}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`text-sm font-semibold ${colors.accentText} tracking-[4px] uppercase`}>
            Get to know me
          </span>
          <h2 className={`text-4xl lg:text-5xl font-black ${colors.text} mt-3`}>
            About Me
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: colors.accent }} />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Circle Image */}
          <div className="w-full max-w-95 lg:max-w-105 shrink-0 flex items-center justify-center">
            <div className="about-image-wrapper relative w-75 h-75 sm:w-85 sm:h-85 lg:w-100 lg:h-100 cursor-pointer">
              
              {/* Outer Glow Ring */}
              <div 
                className="glow-ring absolute -inset-3.75 rounded-full opacity-30 blur-xl transition-all duration-700"
                style={{ backgroundColor: colors.accent }}
              />

              {/* Rotating Outer Ring with Dashed Border */}
              <div 
                className="outer-ring absolute -inset-2 rounded-full transition-all duration-700"
                style={{ 
                  border: `2px dashed ${colors.accent}40`,
                }}
              >
                {/* Rotating SVG Text - Outer */}
                <svg 
                  className="rotate-text absolute inset-0 w-full h-full"
                  viewBox="0 0 300 300"
                >
                  <defs>
                    <path 
                      id="circlePath" 
                      d="M 150, 150 m -130, 0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
                    />
                  </defs>
                  <text fill={colors.accent} fontSize="11" fontWeight="600" letterSpacing="6">
                    <textPath href="#circlePath">
                      FULL STACK DEVELOPER • SOFTWARE DEVELOPER • PROBLEM SOLVER • 
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Accent Dots on Ring */}
              {[0, 90, 180, 270].map((deg, i) => (
                <div
                  key={i}
                  className="dot-indicator absolute w-2.5 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: colors.accent,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateY(-${50}%) translateX(-50%)`,
                    transformOrigin: '0 0',
                    marginTop: `-${i === 0 ? 150 : i === 2 ? -150 : 0}px`,
                    marginLeft: `-${i === 1 ? -150 : i === 3 ? 150 : 0}px`,
                    boxShadow: `0 0 10px ${colors.accent}80`
                  }}
                />
              ))}

              {/* Profile Image Circle */}
              <div className="absolute inset-7.5 rounded-full overflow-hidden">
                <img
                  src="/arun-linkedin.png"
                  alt="Profile"
                  className="profile-img w-full h-full object-cover rounded-full relative z-10 
                    border-4 transition-all duration-700"
                  style={{ 
                    borderColor: `${colors.accent}50`,
                    boxShadow: `0 0 30px ${colors.accent}20, inset 0 0 30px rgba(0,0,0,0.3)`
                  }}
                />
              </div>

              {/* Floating Badge - Bottom Right */}
              {/* <div 
                className={`absolute -bottom-2 -right-2 z-20 px-4 py-2.5 rounded-xl 
                  ${isDark ? 'bg-[#161616]' : 'bg-white'} border ${colors.border} 
                  shadow-lg flex items-center gap-2 transition-all duration-500`}
                style={{ boxShadow: `0 8px 25px ${colors.shadowColor}` }}
              >
                <span className="text-xl">💻</span>
                <div>
                  <div className={`text-[10px] ${colors.textMuted}`}>Coding</div>
                  <div className={`text-xs font-bold ${colors.text}`}>4+ Years</div>
                </div>
              </div> */}

              {/* Floating Badge - Top Left */}
              {/* <div 
                className={`absolute -top-2 -left-2 z-20 px-4 py-2.5 rounded-xl 
                  ${isDark ? 'bg-[#161616]' : 'bg-white'} border ${colors.border} 
                  shadow-lg flex items-center gap-2 transition-all duration-500`}
                style={{ boxShadow: `0 8px 25px ${colors.shadowColor}` }}
              >
                <span className="text-xl">🚀</span>
                <div>
                  <div className={`text-[10px] ${colors.textMuted}`}>Projects</div>
                  <div className={`text-xs font-bold ${colors.text}`}>20+ Done</div>
                </div>
              </div> */}

              {/* Status Dot */}
              <div className="absolute top-8 right-8 z-20 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: '#22c55e' }} />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <p className={`text-base lg:text-lg leading-[1.8] ${colors.textSecondary} mb-8`}>
              {data.description}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className={`${colors.bgCard} border ${colors.border} rounded-xl p-4 text-center 
                    transition-all duration-300 cursor-pointer`}
                  style={{ boxShadow: `0 4px 20px ${colors.shadowColor}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 15px 35px ${colors.shadowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadowColor}`;
                  }}
                >
                  <card.icon size={20} className={`${colors.accentText} mx-auto mb-2`} />
                  <div className={`text-xs ${colors.textMuted} mb-1`}>{card.label}</div>
                  <div className={`text-sm font-bold ${colors.text}`}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 flex-wrap">
              {[
                { Icon: Github, href: data.socialLinks.github, label: 'GitHub' },
                { Icon: Linkedin, href: data.socialLinks.linkedin, label: 'LinkedIn' },
                { Icon: Mail, href: data.socialLinks.email, label: 'Email' }
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 ${colors.bgCard} border ${colors.border} 
                    ${colors.text} no-underline text-sm font-medium transition-all duration-300 rounded-xl group`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                    e.currentTarget.style.boxShadow = `0 8px 30px ${colors.shadowColor}`;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.querySelector('.social-icon').style.color = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.querySelector('.social-icon').style.color = 'inherit';
                  }}
                >
                  <Icon size={18} className="social-icon transition-colors duration-300" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


