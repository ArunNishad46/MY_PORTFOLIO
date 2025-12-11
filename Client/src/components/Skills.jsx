import React from "react";
import skills from "../data/skills";

function Skills() {
  
  return (
    <section id="skills" className="py-16 border-t border-slate-800">
      <h2 className="text-4xl font-semibold mb-4 text-center">Skills</h2>
      <p className="text-lg text-slate-300 mb-8 text-center">
        Technologies used recently for building projects.
      </p>
      <div className="grid grid-cols-3 place-items-center md:grid-cols-5 md:gap-4">
        {skills.map((skill) => {
          const express = skill.name === "ExpressJS";
          const github = skill.name === "Github";
          return (
            <div
              key={skill}
              className="px-4 py-3 text-sm font-medium text-slate-100 text-center"
            >
              <img src={skill.icon} alt={skill.name} className={`w-15 mx-auto mb-2 ${express ? "bg-gray-100 rounded-full p-1" : github ? "bg-gray-100 rounded-full" : ""}`} />
              <p>{skill.name}</p>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default Skills;
