import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
// import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { portfolioData } from '../info';
import { useTheme } from '../context/ThemeContext';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { colors } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${colors.bg} min-h-screen transition-colors duration-500`}>
      <Header activeSection={activeSection} />
      <main>
        <Hero data={portfolioData} />
        <About data={portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        {/* <Experience experience={portfolioData.experience} /> */}
        <Education education={portfolioData.education} />
        <Contact contact={portfolioData.contact} />
      </main>
      <Footer data={portfolioData} />
    </div>
  );
};

export default Portfolio;



