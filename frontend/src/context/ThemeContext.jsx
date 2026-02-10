import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark
      ? {
          bg: 'bg-[#0a0a0a]',
          bgSecondary: 'bg-[#111111]',
          bgCard: 'bg-[#161616]',
          bgCardHover: 'hover:bg-[#1a1a1a]',
          text: 'text-white',
          textSecondary: 'text-white/70',
          textMuted: 'text-white/50',
          border: 'border-white/10',
          borderHover: 'hover:border-[#00FFD1]',
          accent: '#00FFD1',
          accentText: 'text-[#00FFD1]',
          accentBg: 'bg-[#00FFD1]',
          accentBgLight: 'bg-[#00FFD1]/10',
          headerBg: 'bg-[#0a0a0a]/90',
          inputBg: 'bg-white/5',
          shadowColor: 'rgba(0, 255, 209, 0.15)',
        }
      : {
          bg: 'bg-[#fafafa]',
          bgSecondary: 'bg-white',
          bgCard: 'bg-white',
          bgCardHover: 'hover:bg-gray-50',
          text: 'text-gray-900',
          textSecondary: 'text-gray-600',
          textMuted: 'text-gray-400',
          border: 'border-gray-200',
          borderHover: 'hover:border-[#00B894]',
          accent: '#00B894',
          accentText: 'text-[#00B894]',
          accentBg: 'bg-[#00B894]',
          accentBgLight: 'bg-[#00B894]/10',
          headerBg: 'bg-white/90',
          inputBg: 'bg-gray-50',
          shadowColor: 'rgba(0, 184, 148, 0.15)',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};