/**
 * Contact.jsx — Contact Form & Safety Guidelines Page
 * 
 * Two main sections:
 *   1. Contact Section:
 *      - Contact form (name, email, subject, message) with HTML5 validation
 *      - Success message displayed for 4 seconds after submission
 *      - HQ info sidebar (address, phone, email, business hours)
 *   2. Mountaineering Guidelines:
 *      - Preparation checklist (7 items)
 *      - Acclimatization guidelines (7 items)
 *      - Leave No Trace principles (7 items)
 *      - Safety priority CTA banner
 * 
 * Form is client-side only (no backend submission).
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaMountain,
  FaHeart,
  FaLeaf,
  FaThermometerFull,
} from 'react-icons/fa';
import {
  BsShieldCheck,
  BsListCheck,
  BsPersonCheck,
} from 'react-icons/bs';

// Local image assets
import starryMountainImg from '../assets/images/starry-mountain.jpg';

export default function Contact() {
  const { t } = useTranslation();

  const guidelineData = [
    {
      titleKey: 'contact.preparation',
      icon: <BsListCheck />,
      color: 'var(--color-forest)',
      itemKeys: ['contact.prep_1', 'contact.prep_2', 'contact.prep_3', 'contact.prep_4', 'contact.prep_5', 'contact.prep_6', 'contact.prep_7'],
    },
    {
      titleKey: 'contact.acclimatization',
      icon: <FaThermometerFull />,
      color: 'var(--color-stone)',
      itemKeys: ['contact.acclim_1', 'contact.acclim_2', 'contact.acclim_3', 'contact.acclim_4', 'contact.acclim_5', 'contact.acclim_6', 'contact.acclim_7'],
    },
    {
      titleKey: 'contact.leave_no_trace',
      icon: <FaLeaf />,
      color: '#2d8659',
      itemKeys: ['contact.lnt_1', 'contact.lnt_2', 'contact.lnt_3', 'contact.lnt_4', 'contact.lnt_5', 'contact.lnt_6', 'contact.lnt_7'],
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${starryMountainImg})` }}
      >
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span>/</span>
            <span className="breadcrumb-active">{t('nav.contact')}</span>
          </div>
          <h1>{t('contact.hero_title')}</h1>
          <p>{t('contact.hero_subtitle')}</p>
        </div>
      </section>

      {/* ═══ Contact Form ═══ */}
      <section className="section-padding" id="contact-form">
        <div className="container">
          <div className="row g-5">
            {/* Form */}
            <div className="col-lg-7">
              <h2 className="content-title">
                <span className="title-accent">{t('contact.get_in_touch').split(' ')[0]}</span> {t('contact.get_in_touch').split(' ').slice(1).join(' ')}
              </h2>
              <p>{t('contact.form_subtitle')}</p>

              {submitted && (
                <div className="alert-success-custom animate-fade-in-up">
                  <FaCheckCircle className="me-2" />
                  {t('contact.success_message')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="name" className="form-label-custom">{t('contact.name_label')}</label>
                    <input type="text" id="name" name="name" className="form-input-custom" value={formData.name} onChange={handleChange} required placeholder={t('contact.name_placeholder')} />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="email" className="form-label-custom">{t('contact.email_label')}</label>
                    <input type="email" id="email" name="email" className="form-input-custom" value={formData.email} onChange={handleChange} required placeholder={t('contact.email_placeholder')} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label-custom">{t('contact.subject_label')}</label>
                    <input type="text" id="subject" name="subject" className="form-input-custom" value={formData.subject} onChange={handleChange} required placeholder={t('contact.subject_placeholder')} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label-custom">{t('contact.message_label')}</label>
                    <textarea id="message" name="message" className="form-input-custom" rows={5} value={formData.message} onChange={handleChange} required placeholder={t('contact.message_placeholder')} />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn-alpine">
                      <FaPaperPlane className="me-2" /> {t('contact.send_message')}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="col-lg-5">
              <div className="contact-info-card">
                <h4><FaMountain className="me-2 text-stone" /> {t('contact.hq_title')}</h4>
                <div className="contact-info-item">
                  <FaMapMarkerAlt className="contact-info-icon" />
                  <div>
                    <strong>{t('contact.address_label')}</strong>
                    <span>{t('contact.address_value')}</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <FaPhone className="contact-info-icon" />
                  <div>
                    <strong>{t('contact.phone_label')}</strong>
                    <span>{t('contact.phone_value')}</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <FaEnvelope className="contact-info-icon" />
                  <div>
                    <strong>{t('contact.email_info_label')}</strong>
                    <span>{t('contact.email_value')}</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <FaClock className="contact-info-icon" />
                  <div>
                    <strong>{t('contact.hours_label')}</strong>
                    <span>{t('contact.hours_value')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FR-011: Guidelines ═══ */}
      <section className="section-padding bg-glacier" id="guidelines">
        <div className="container">
          <div className="section-header">
            <h2>{t('contact.guidelines_title')}</h2>
            <p>{t('contact.guidelines_subtitle')}</p>
          </div>

          <div className="row g-4">
            {guidelineData.map((cat) => (
              <div className="col-lg-4" key={cat.titleKey}>
                <div className="guideline-card">
                  <div className="guideline-icon" style={{ color: cat.color }}>
                    {cat.icon}
                  </div>
                  <h4>{t(cat.titleKey)}</h4>
                  <ol className="guideline-list">
                    {cat.itemKeys.map((key, idx) => (
                      <li key={idx}>{t(key)}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-5 pt-4">
            <div className="guidelines-cta">
              <BsShieldCheck style={{ fontSize: '2rem', color: 'var(--color-forest)' }} />
              <p>
                <strong>{t('contact.safety_priority')}</strong> {t('contact.safety_priority_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
