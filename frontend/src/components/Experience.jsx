// // src/components/Experience.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { Briefcase, Calendar } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';

// const Experience = ({ experience }) => {
//   const expRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const { isDark, colors } = useTheme();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
//       },
//       { threshold: 0.1 }
//     );
//     if (expRef.current) observer.observe(expRef.current);
//     return () => { if (expRef.current) observer.unobserve(expRef.current); };
//   }, []);

//   return (
//     <section
//       id="experience"
//       className={`py-20 lg:py-28 px-6 lg:px-12 relative transition-colors duration-500 ${colors.bgSecondary}`}
//       ref={expRef}
//     >
//       <div
//         className={`max-w-[900px] mx-auto transition-all duration-1000 ease-out
//           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
//       >
//         {/* Section Title */}
//         <div className="text-center mb-16">
//           <span className={`text-sm font-semibold ${colors.accentText} tracking-[4px] uppercase`}>
//             My Journey
//           </span>
//           <h2 className={`text-4xl lg:text-5xl font-black ${colors.text} mt-3`}>
//             Experience
//           </h2>
//           <div className={`w-20 h-1 mx-auto mt-4 rounded-full`}
//             style={{ backgroundColor: colors.accent }} />
//         </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Timeline Line */}
//           <div className={`absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 
//             ${isDark ? 'bg-white/10' : 'bg-gray-200'} lg:-translate-x-1/2`} />

//           {experience.map((exp, index) => (
//             <div
//               key={exp.id}
//               className={`relative flex flex-col lg:flex-row items-start mb-12 last:mb-0
//                 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
//               style={{
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
//                 transitionDelay: `${index * 150}ms`,
//                 transition: 'all 0.6s ease-out'
//               }}
//             >
//               {/* Timeline Dot */}
//               <div className={`absolute left-6 lg:left-1/2 w-3 h-3 rounded-full z-10 
//                 lg:-translate-x-1/2 -translate-x-1/2`}
//                 style={{
//                   backgroundColor: colors.accent,
//                   boxShadow: `0 0 20px ${colors.accent}60`
//                 }}
//               />

//               {/* Content Card */}
//               <div className={`ml-14 lg:ml-0 lg:w-[calc(50%-30px)] 
//                 ${index % 2 === 0 ? 'lg:pr-0 lg:mr-auto' : 'lg:pl-0 lg:ml-auto'}
//                 ${colors.bgCard} border ${colors.border} rounded-2xl p-6 
//                 transition-all duration-300 group`}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = colors.accent;
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                   e.currentTarget.style.boxShadow = `0 15px 40px ${colors.shadowColor}`;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '';
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = 'none';
//                 }}
//               >
//                 {/* Duration Badge */}
//                 <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
//                   ${colors.accentBgLight} ${colors.accentText} text-xs font-semibold mb-3`}>
//                   <Calendar size={12} />
//                   {exp.duration}
//                 </div>

//                 <h3 className={`text-xl font-bold ${colors.text} mb-1`}>
//                   {exp.role}
//                 </h3>
//                 <div className={`flex items-center gap-2 ${colors.accentText} text-sm font-medium mb-3`}>
//                   <Briefcase size={14} />
//                   {exp.company}
//                 </div>
//                 <p className={`text-sm leading-relaxed ${colors.textSecondary} mb-4`}>
//                   {exp.description}
//                 </p>

//                 {/* Tech Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {exp.technologies.map((tech, idx) => (
//                     <span
//                       key={idx}
//                       className={`px-2.5 py-1 text-xs font-medium rounded-md 
//                         ${isDark ? 'bg-white/5 text-white/60' : 'bg-gray-100 text-gray-600'}`}
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Experience;