/**
 * ScrollToTopButton.jsx — Floating Back-to-Top Button
 * 
 * A fixed-position button in the bottom-right corner that appears
 * when the user scrolls past 300px. Uses requestAnimationFrame-throttled
 * scroll events for optimal performance. Clicking it smoothly scrolls
 * the page back to the top.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const rafId = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      setVisible(window.scrollY > 300);
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="scroll-to-top-btn"
      className={`scroll-to-top-btn${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
