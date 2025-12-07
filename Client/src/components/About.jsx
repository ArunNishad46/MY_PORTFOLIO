import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

function About() {
  
  return (
    <section id="about" className="py-16 border-t border-slate-800">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-semibold mb-6">About Me</h2>
          <p className="text-lg md:text-md text-slate-300 max-w-2xl">
            I am a B.Tech graduate in Information Technology with hands-on experience in the MERN stack development through academic and personal projects. I enjoy building responsive, scalable, and user-friendly applications, and I’m continuously learning new technologies to improve my skills.
          </p>
          <p className="text-lg md:text-md text-slate-300 max-w-2xl">
            As a web developer, I work across both front-end and back-end development. I specialize in creating modern applications using technologies like React, Next.js, Tailwind CSS, Node.js, Express.js, and MongoDB.
          </p>
          <p className="text-lg md:text-md text-slate-300 max-w-2xl"> 
            I’m currently looking for opportunities where I can learn more, gain real-world experience, and continue growing my career in web development.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://github.com/arunnishad46" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded transition">
              <FaGithub />GitHub
            </a>
            <a href="https://www.linkedin.com/in/arun-nishad-8b94a3287" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded transition">
              <FaLinkedin />LinkedIn
            </a>
            <a href="mailto:arunnishad731022@gmail.com" className="flex items-center gap-2 px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded transition">
              <FiMail />Email
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img className="w-80" src="/image/logo2.webp" alt="LOGO" />
        </div>
      </div>
    </section>
  );
}

export default About;
