/**
 * ScrollToTop.jsx — Route Change Scroll Handler
 * 
 * A utility component that listens for route pathname changes via
 * React Router's useLocation() hook and smoothly scrolls the window
 * to the top. Renders nothing (returns null).
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
