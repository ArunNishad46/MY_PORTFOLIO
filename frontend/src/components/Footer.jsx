import React from 'react';
import { Heart, Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();
  const { isDark, colors } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    // { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Github, href: data.contact.socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: data.contact.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: data.contact.socialLinks.twitter, label: 'Twitter' },
    { icon: Instagram, href: data.contact.socialLinks.instagram, label: 'Instagram' }
  ];

  return (
    <footer className={`${isDark ? 'bg-[#050505]' : 'bg-gray-900'} relative transition-colors duration-500`}>
      {/* Top Accent Line */}
      <div className="w-full h-px" style={{
        background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`
      }} />

      {/* Scroll to Top Button */}
      <div className="flex justify-center -mt-6 relative z-10">
        <button
          onClick={scrollToTop}
          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer 
            border-none transition-all duration-300 hover:-translate-y-1`}
          style={{
            backgroundColor: colors.accent,
            boxShadow: `0 8px 25px ${colors.accent}50`
          }}
        >
          <ArrowUp size={20} className="text-black" />
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-350 mx-auto px-6 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black tracking-[3px] mb-4"
              style={{ color: colors.accent }}>
              ARUN
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              A Web Developer passionate about building user-friendly and modern web applications.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center 
                    text-white/50 no-underline transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                    e.currentTarget.style.color = colors.accent;
                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-[2px] mb-5">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/50 text-sm bg-transparent border-none cursor-pointer 
                      transition-all duration-300 hover:text-white hover:translate-x-1 flex items-center gap-2 p-0"
                    onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.5 }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-[2px] mb-5">
              Contact
            </h3>
            <div className="space-y-4">
              <a href={`mailto:${data.contact.email}`}
                className="flex items-center gap-3 text-white/50 text-sm no-underline transition-all duration-300 hover:text-white"
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
              >
                <Mail size={16} style={{ color: colors.accent, opacity: 0.7 }} />
                {data.contact.email}
              </a>
              <a href={`tel:${data.contact.phone}`}
                className="flex items-center gap-3 text-white/50 text-sm no-underline transition-all duration-300 hover:text-white"
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
              >
                <Phone size={16} style={{ color: colors.accent, opacity: 0.7 }} />
                {data.contact.phone}
              </a>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin size={16} style={{ color: colors.accent, opacity: 0.7 }} />
                {data.contact.location}
              </div>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-[2px] mb-5">
              Let's Connect
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Interested in working together? Feel free to reach out!
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-3 rounded-xl text-sm font-bold text-black border-none cursor-pointer 
                transition-all duration-300 hover:-translate-y-1 flex items-center gap-2`}
              style={{
                backgroundColor: colors.accent,
                boxShadow: `0 8px 25px ${colors.accent}40`
              }}
            >
              Get in Touch
              <Mail size={16} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-white/40 flex items-center gap-1.5">
            © {currentYear} {data.name}. Made with
            <Heart size={14} className="animate-pulse" style={{ color: colors.accent }} />
          </p>

          {/* Powered By */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Zap size={14} style={{ color: colors.accent }} />
            <span>Powered by</span>
            <a
              href="https://arlmatrix.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold no-underline transition-all duration-300"
              style={{ color: colors.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = `0 0 15px ${colors.accent}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              ARL Matrix
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


