/**
 * Footer.jsx — Site-Wide Footer Component
 * 
 * Renders the footer section visible on all pages, containing:
 *   - Brand column with logo, description, and social media links
 *   - Quick links to all pages
 *   - Services listing (guided expeditions, climbing courses, etc.)
 *   - Contact information (address, phone, email, hours)
 *   - Copyright bar with privacy policy and terms links
 *   - Ticker component (real-time scrolling bar with date/time/location)
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import Ticker from './Ticker';
import AlpineLogo from './AlpineLogo';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/expeditions', label: t('nav.expeditions') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/team', label: t('nav.team') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const services = [
    t('footer.guided_expeditions'),
    t('footer.climbing_courses'),
    t('footer.equipment_rental'),
    t('footer.custom_adventures'),
    t('footer.corporate_retreats'),
  ];

  return (
    <footer className="alpine-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <AlpineLogo size={32} className="brand-logo-svg" light={true} />
              {t('common.brand_name')}
            </div>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {t('footer.brand_desc')}
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5>{t('footer.quick_links')}</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link) => (
                <li key={link.to} className="mb-2">
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h5>{t('footer.our_services')}</h5>
            <ul className="list-unstyled">
              {services.map((s) => (
                <li key={s} className="mb-2">
                  <a href="#">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5>{t('footer.contact_us')}</h5>
            <ul className="list-unstyled" style={{ fontSize: '0.95rem' }}>
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--color-stone)' }}></i>
                {t('footer.address')}
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone-fill me-2" style={{ color: 'var(--color-stone)' }}></i>
                {t('footer.phone')}
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill me-2" style={{ color: 'var(--color-stone)' }}></i>
                {t('footer.email')}
              </li>
              <li className="mb-2">
                <i className="bi bi-clock-fill me-2" style={{ color: 'var(--color-stone)' }}></i>
                {t('footer.hours')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom text-center">
          <p className="mb-0" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            &copy; {new Date().getFullYear()} {t('common.brand_name')}. {t('footer.all_rights_reserved')} &nbsp;|&nbsp;
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('footer.privacy_policy')}</a> &nbsp;|&nbsp;
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('footer.terms_of_service')}</a>
          </p>
        </div>
      </div>

      {/* Dynamic Ticker */}
      <Ticker />
    </footer>
  );
}
