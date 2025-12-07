import React, { useState } from "react";
import { Link } from "react-scroll";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "skills", label: "Skills" },
    { to: "projects", label: "Projects" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur border-b border-slate-800 bg-slate-900/80`}>
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
        className="text-2xl font-bold tracking-tight text-cyan-400 cursor-pointer"
        to="home"
        smooth={true}
        duration={500}
        offset={-80}
        spy={true}
        >
          ARUN
        </Link>

        <ul className="hidden md:flex gap-6 text-md font-medium">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                className={`cursor-pointer text-slate-300 hover:text-cyan-400 transition`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 focus:outline-none cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <RxCross2 size={24} /> : <HiOutlineBars3 size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <ul className="flex flex-col py-2 space-y-2 text-center text-md font-medium">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  spy={true}
                  onClick={() => setOpen(false)}
                  className={`w-full cursor-pointer block py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
