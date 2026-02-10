import React, { useEffect, useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, ArrowUpRight, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';

const Contact = ({ contact }) => {
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark, colors } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
      },
      { threshold: 0.1 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => { if (contactRef.current) observer.unobserve(contactRef.current); };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('All fields are required', {
        style: {
          background: isDark ? '#1a1a1a' : '#fff',
          color: isDark ? '#fff' : '#1a1a1a',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#fff',
        },
      });
      return;
    }

    setIsSubmitting(true);

    const loadingToast = toast.loading('Sending your message...', {
      style: {
        background: isDark ? '#1a1a1a' : '#fff',
        color: isDark ? '#fff' : '#1a1a1a',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      },
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success(data.message, {
          duration: 5000,
          style: {
            background: isDark ? '#1a1a1a' : '#fff',
            color: isDark ? '#fff' : '#1a1a1a',
            border: `1px solid ${colors.accent}40`,
            boxShadow: `0 8px 30px ${colors.accent}20`,
          },
          iconTheme: {
            primary: colors.accent,
            secondary: isDark ? '#1a1a1a' : '#fff',
          },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || 'Failed to send message. Please try again.', {
          duration: 4000,
          style: {
            background: isDark ? '#1a1a1a' : '#fff',
            color: isDark ? '#fff' : '#1a1a1a',
            border: '1px solid rgba(239,68,68,0.3)',
          },
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.data.message, {
        duration: 4000,
        style: {
          background: isDark ? '#1a1a1a' : '#fff',
          color: isDark ? '#fff' : '#1a1a1a',
          border: '1px solid rgba(239,68,68,0.3)',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: '#EA4335'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: '#34A853'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: contact.location,
      href: '#',
      color: '#4285F4'
    }
  ];

  const socialLinks = [
    { icon: Github, href: contact.socialLinks.github, label: 'GitHub', color: isDark ? '#fff' : '#333' },
    { icon: Linkedin, href: contact.socialLinks.linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { icon: Twitter, href: contact.socialLinks.twitter, label: 'Twitter', color: '#1DA1F2' },
    { icon: Instagram, href: contact.socialLinks.instagram, label: 'Instagram', color: '#E4405F' }
  ];

  return (
    <section
      id="contact"
      className={`py-20 lg:py-28 px-6 lg:px-12 relative transition-colors duration-500 ${colors.bg}`}
      ref={contactRef}
    >
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            borderRadius: '12px',
            padding: '14px 18px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '400px',
          },
        }}
      />

      <div
        className={`max-w-350 mx-auto transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7.5'}`}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`text-sm font-semibold ${colors.accentText} tracking-[4px] uppercase`}>
            Reach Out
          </span>
          <h2 className={`text-4xl lg:text-5xl font-black ${colors.text} mt-3`}>
            Get In Touch
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: colors.accent }} />
          <p className={`text-base ${colors.textMuted} mt-4 max-w-lg mx-auto`}>
            Have a project in mind? Let's work together to create something amazing!
          </p>
        </div>

        {/* Content - Cards Left, Form Right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Contact Cards & Social */}
          <div className="w-full lg:w-100 shrink-0 flex flex-col gap-6">
            {/* Contact Info Cards */}
            {contactCards.map((card, i) => (
              <a
                key={i}
                href={card.href}
                className={`${colors.bgCard} border ${colors.border} rounded-2xl p-5 flex items-center gap-4 
                  no-underline transition-all duration-300 group`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${colors.shadowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${card.color}15` }}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium ${colors.textMuted} mb-0.5`}>{card.title}</div>
                  <div className={`text-sm font-semibold ${colors.text} truncate`}>{card.value}</div>
                </div>
                <ArrowUpRight size={16} className={`${colors.textMuted} shrink-0 transition-all duration-300`} />
              </a>
            ))}

            {/* Social Links Card */}
            <div className={`${colors.bgCard} border ${colors.border} rounded-2xl p-6`}>
              <h3 className={`text-base font-bold ${colors.text} mb-4`}>Follow Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'} 
                      border ${colors.border} no-underline transition-all duration-300 group`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = social.color;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <social.icon size={18} style={{ color: social.color }} />
                    <span className={`text-sm font-medium ${colors.text}`}>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}15, ${colors.accent}05)`,
                border: `1px solid ${colors.accent}30`
              }}
            >
              <div className="text-3xl mb-3">🚀</div>
              <h3 className={`text-lg font-bold ${colors.text} mb-2`}>Let's Build Together</h3>
              <p className={`text-sm ${colors.textSecondary} leading-relaxed`}>
                I'm always interested in hearing about new projects and opportunities.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex-1">
            <form
              className={`${colors.bgCard} border ${colors.border} rounded-2xl p-6 lg:p-10 
                transition-all duration-500 h-full`}
              onSubmit={handleSubmit}
              style={{
                boxShadow: `0 4px 30px ${colors.shadowColor}`
              }}
            >
              <h3 className={`text-xl font-bold ${colors.text} mb-6`}>Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-semibold ${colors.text} mb-2`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full p-3.5 ${colors.inputBg} border ${colors.border} ${colors.text} text-sm 
                      transition-all duration-300 rounded-xl outline-none`}
                    style={{ boxSizing: 'border-box' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.accent;
                      e.target.style.boxShadow = `0 0 0 3px ${colors.accent}15`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold ${colors.text} mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full p-3.5 ${colors.inputBg} border ${colors.border} ${colors.text} text-sm 
                      transition-all duration-300 rounded-xl outline-none`}
                    style={{ boxSizing: 'border-box' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.accent;
                      e.target.style.boxShadow = `0 0 0 3px ${colors.accent}15`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label htmlFor="subject" className={`block text-sm font-semibold ${colors.text} mb-2`}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project discussion"
                  className={`w-full p-3.5 ${colors.inputBg} border ${colors.border} ${colors.text} text-sm 
                    transition-all duration-300 rounded-xl outline-none`}
                  style={{ boxSizing: 'border-box' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}15`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className={`block text-sm font-semibold ${colors.text} mb-2`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell me about your project..."
                  className={`w-full p-3.5 ${colors.inputBg} border ${colors.border} ${colors.text} text-sm 
                    transition-all duration-300 rounded-xl outline-none resize-y min-h-30`}
                  style={{ boxSizing: 'border-box' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}15`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 px-8 ${colors.accentBg} text-black border-none text-base font-bold 
                  cursor-pointer transition-all duration-400 flex items-center justify-center gap-2.5 rounded-xl
                  hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 group`}
                disabled={isSubmitting}
                style={{
                  boxShadow: `0 8px 30px ${colors.accent}40`
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.boxShadow = `0 15px 40px ${colors.accent}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${colors.accent}40`;
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

