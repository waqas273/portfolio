import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-zinc-800/80 bg-zinc-950/40 text-zinc-400 hover:border-cyber hover:text-cyber hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-inner"
      title={theme === 'dark' ? 'Initialize Light Mode' : 'Initialize Dark Mode'}
      aria-label="Toggle Theme Mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
      )}
    </button>
  );
}
