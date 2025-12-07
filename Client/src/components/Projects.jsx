import React from "react";
import projects from "../data/projects";

function Projects() {

  return (
    <section id="projects" className="py-16 border-t border-slate-800">
      <h2 className="text-4xl font-semibold mb-4 text-center">Projects</h2>
      <p className="text-lg text-slate-300 mb-10 text-center">
        Here are a few projects I've worked on recently.
      </p>
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between"
          >
            <img src={p.image} alt={p.title} className="aspect-3/2 object-fit mb-4 rounded-t-lg" />
            <div className="px-4">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-slate-300 mb-3">{p.description}</p>
              <p className="text-xs text-cyan-300 font-medium">{p.tech}</p>
            </div>
            <div className="m-4 flex items-center justify-between">
              <a
                href={p.githubLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-slate-900 bg-cyan-500 hover:bg-cyan-400 px-3 py-2 rounded-full"
              >
                Github →
              </a>
              <a
                href={p.liveLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block ml-4 text-sm font-semibold text-slate-900 bg-cyan-500 hover:bg-cyan-400 px-3 py-2 rounded-full" 
              >
                Live Demo →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
