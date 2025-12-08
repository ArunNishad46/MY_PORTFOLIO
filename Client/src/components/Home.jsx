import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";

function Home() {

  return (
    <section
      id="home"
      className="pt-25 pb-16 flex flex-col md:flex-row items-center gap-10"
    >
      <div className="flex-1 space-y-6">
        <p className="flex items-center text-xl font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Hi There!<img className="inline-block w-8 h-8" src="/image/hand.webp" alt="wave" />
        </p>
        <h1 className="text-5xl md:text-5xl font-extrabold">
          I'm ARUN
        </h1>
        <h2 className="text-2xl font-bold md:text-3xl text-slate-300 flex items-center gap-2">
          <span className="text-cyan-400">
            <Typewriter
              options={{
                strings: [
                  "Web Developer",
                  "Frontend Developer",
                  "Backend Developer",
                  "MERN Stack Developer",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/Arun-CV.pdf"
            download
            className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold text-sm transition"
          >
            Download CV
          </a>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-80}
            spy={true}
            className="px-5 py-2.5 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-semibold text-sm transition cursor-pointer"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <img className="w-80" src="/image/logo.webp" alt="ARUN" />
      </div>
    </section>
  );
};

export default Home;
