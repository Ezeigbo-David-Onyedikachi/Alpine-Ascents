/**
 * Navbar.jsx — Main Navigation Bar Component
 * 
 * A fixed-top responsive navigation bar with:
 *   - Brand logo and site name
 *   - Page navigation links (Home, Expeditions, Gallery, Team, About, Contact)
 *   - Theme toggle button (dark/light mode)
 *   - Language selector dropdown (6 languages)
 *   - Visitor counter badge (localStorage + sessionStorage based)
 *   - Scroll-aware transparency (transparent at top, solid on scroll)
 *   - Mobile hamburger menu with collapse animation
 *   - Skip navigation link for accessibility (keyboard users)
 *   - "Book Now" CTA button linking to /contact
 */

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsPeopleFill } from 'react-icons/bs';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import AlpineLogo from './AlpineLogo';

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  // Scroll effect: transparent → solid
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visitor counter using localStorage + sessionStorage
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('alpine_visited');
    let count = parseInt(localStorage.getItem('alpine_visitor_count') || '0', 10);

    if (!hasVisited) {
      count += 1;
      localStorage.setItem('alpine_visitor_count', count.toString());
      sessionStorage.setItem('alpine_visited', 'true');
    }

    setVisitorCount(count);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/expeditions', label: t('nav.expeditions') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/team', label: t('nav.team') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const handleNavClick = () => {
    setCollapsed(true);
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a className="skip-nav" href="#main-content">
        {t('nav.skip_to_content')}
      </a>
      <nav
        className={`navbar navbar-expand-lg fixed-top alpine-navbar ${scrolled ? 'scrolled' : ''}`}
        aria-label={t('common.aria_main_nav')}
      >
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <AlpineLogo size={34} className="brand-logo-svg" light={true} />
          <span>{t('common.brand_name')}</span>
        </Link>

        {/* Language Selector + Theme Toggle + Visitor Counter - desktop */}
        <div className="d-none d-lg-flex align-items-center order-lg-last ms-3 gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <div className="visitor-badge">
            <BsPeopleFill />
            <span>{visitorCount.toLocaleString()} {t('nav.visits')}</span>
          </div>
        </div>

        {/* Hamburger Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-controls="alpineNavbar"
          aria-expanded={!collapsed}
          aria-label={t('common.aria_toggle_nav')}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav */}
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="alpineNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  to={link.to}
                  end={link.to === '/'}
                  onClick={handleNavClick}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile: language selector + theme toggle + visitor counter */}
          <div className="d-lg-none mb-3">
            <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <div className="visitor-badge justify-content-center">
              <BsPeopleFill />
              <span>{visitorCount.toLocaleString()} {t('nav.visits')}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="nav-link nav-cta"
            onClick={handleNavClick}
          >
            {t('nav.book_now')}
          </Link>
        </div>
      </div>
    </nav>
    </>
  );
}
