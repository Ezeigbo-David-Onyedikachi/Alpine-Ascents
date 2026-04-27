/**
 * ThemeContext.jsx — Dark/Light Theme Provider
 * 
 * Provides global theme state ('light' or 'dark') to all child components
 * using React Context API. Theme preference is persisted in localStorage
 * and respects the user's OS-level prefers-color-scheme setting on first visit.
 * 
 * Exports:
 *   - ThemeProvider: Wrapper component that supplies theme context
 *   - useTheme(): Custom hook returning { theme, toggleTheme }
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(undefined);

function getInitialTheme() {
  const stored = localStorage.getItem('alpine-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alpine-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
