'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false); // Default to light
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    
    // Theme version - increment to force reset for all users
    const THEME_VERSION = '2.0';
    const savedVersion = localStorage.getItem('theme-version');
    const savedTheme = localStorage.getItem('theme');
    
    // If version changed, reset to light mode (ignores old preferences)
    if (savedVersion !== THEME_VERSION) {
      setIsDark(false);
      localStorage.setItem('theme', 'light');
      localStorage.setItem('theme-version', THEME_VERSION);
    } else if (savedTheme) {
      // Use saved preference only if version matches
      setIsDark(savedTheme === 'dark');
    } else {
      // New users default to light
      setIsDark(false);
      localStorage.setItem('theme', 'light');
      localStorage.setItem('theme-version', THEME_VERSION);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-14 h-8 glass rounded-full animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 glass glass-hover rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background track */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isDark ? 'bg-slate-700/50' : 'bg-purple-200/50'
        }`}
      />

      {/* Slider */}
      <div
        className={`relative w-6 h-6 rounded-full glass shadow-lg transition-all duration-300 transform ${
          isDark ? 'translate-x-6 bg-slate-200/90' : 'translate-x-0 bg-purple-400/90'
        }`}
      >
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isDark ? (
            <svg className="w-3 h-3 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-purple-800" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isDark
            ? 'shadow-[0_0_20px_rgba(168,139,250,0.3)]' /* purple-400 glow */
            : 'shadow-[0_0_20px_rgba(124,58,237,0.3)]' /* purple-600 glow */
        }`}
      />
    </button>
  );
}