/**
 * ThemeToggle.jsx — Dark/Light Mode Toggle Button
 * 
 * A small icon button that toggles between dark and light themes.
 * Uses the useTheme() hook from ThemeContext to read and toggle state.
 * Displays a sun icon in dark mode and a moon icon in light mode.
 */

import { useTheme } from '../context/ThemeContext';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-icon ${isDark ? 'rotate-in' : ''}`}>
        {isDark ? <BsSunFill /> : <BsMoonStarsFill />}
      </span>
    </button>
  );
}
