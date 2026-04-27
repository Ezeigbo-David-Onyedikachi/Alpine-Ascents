/**
 * About.jsx — Mountaineering Information Page
 * 
 * Comprehensive educational page covering:
 *   - What is Mountaineering (overview with image and highlights)
 *   - History timeline (1786–2000s, expandable accordion sections)
 *   - 7 Climbing styles (Alpine, Expedition, Free, Aid, Ice, Bouldering, Sport)
 *   - 5 Essential techniques (Knots, Belaying, Rappelling, Crampons, Ice Axe)
 *   - 3 Shelter types (Bivouac, Tent, Snow Cave) with safety tips
 *   - 4 Mountain hazards (Altitude, Avalanche, Rockfall, Frostbite) with prevention
 * 
 * Uses ExpandableSection sub-component for collapsible timeline entries.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FaMountain,
  FaHiking,
  FaSnowflake,
  FaFirstAid,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaCampground,
  FaHandRock,
} from 'react-icons/fa';
import {
  GiMountainClimbing,
  GiRopeway,
  GiIceBomb,
  GiMountainRoad,
  GiCampingTent,
  GiMountaintop,
  GiSnowflake1,
  GiRock,
  GiKnot,
} from 'react-icons/gi';
import {
  BsShieldExclamation,
  BsThermometerSnow,
  BsSnow2,
  BsEye,
} from 'react-icons/bs';

// Local image assets
import mountainCampImg from '../assets/images/mountain-camp.jpg';
import overviewSummitImg from '../assets/images/overview-summit.png';
import vintageHistoryImg from '../assets/images/vintage-history.png';

/* ─── Expandable Section Component ─── */
function ExpandableSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="expandable-section">
      <button
        className="expandable-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div className={`expandable-body ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Main About Page ─── */
export default function About() {
  const { t } = useTranslation();

  const historyTimeline = [
    { year: '1786', title: t('about.history_1786_title'), text: t('about.history_1786_text') },
    { year: '1854', title: t('about.history_1854_title'), text: t('about.history_1854_text') },
    { year: '1865', title: t('about.history_1865_title'), text: t('about.history_1865_text') },
    { year: '1907', title: t('about.history_1907_title'), text: t('about.history_1907_text') },
    { year: '1953', title: t('about.history_1953_title'), text: t('about.history_1953_text') },
    { year: '1978', title: t('about.history_1978_title'), text: t('about.history_1978_text') },
    { year: '2000s', title: t('about.history_2000s_title'), text: t('about.history_2000s_text') },
  ];

  const climbingStyles = [
    { name: t('about.style_alpine'), icon: <FaMountain />, color: '#2d6a4f', desc: t('about.style_alpine_desc') },
    { name: t('about.style_expedition'), icon: <GiCampingTent />, color: '#0f2240', desc: t('about.style_expedition_desc') },
    { name: t('about.style_free'), icon: <FaHandRock />, color: '#40916c', desc: t('about.style_free_desc') },
    { name: t('about.style_aid'), icon: <GiRopeway />, color: '#c9a96e', desc: t('about.style_aid_desc') },
    { name: t('about.style_ice'), icon: <GiIceBomb />, color: '#1a3a5c', desc: t('about.style_ice_desc') },
    { name: t('about.style_bouldering'), icon: <GiRock />, color: '#6b4226', desc: t('about.style_bouldering_desc') },
    { name: t('about.style_sport'), icon: <GiMountainClimbing />, color: '#c0392b', desc: t('about.style_sport_desc') },
  ];

  const techniques = [
    { name: t('about.tech_knot'), icon: <GiKnot />, visual: '🪢', desc: t('about.tech_knot_desc'), tips: [t('about.tech_knot_tip1'), t('about.tech_knot_tip2'), t('about.tech_knot_tip3')] },
    { name: t('about.tech_belay'), icon: <GiRopeway />, visual: '🧗', desc: t('about.tech_belay_desc'), tips: [t('about.tech_belay_tip1'), t('about.tech_belay_tip2'), t('about.tech_belay_tip3')] },
    { name: t('about.tech_rappel'), icon: <GiMountainClimbing />, visual: '⬇️', desc: t('about.tech_rappel_desc'), tips: [t('about.tech_rappel_tip1'), t('about.tech_rappel_tip2'), t('about.tech_rappel_tip3')] },
    { name: t('about.tech_crampon'), icon: <GiIceBomb />, visual: '🥾', desc: t('about.tech_crampon_desc'), tips: [t('about.tech_crampon_tip1'), t('about.tech_crampon_tip2'), t('about.tech_crampon_tip3')] },
    { name: t('about.tech_iceaxe'), icon: <FaSnowflake />, visual: '🪓', desc: t('about.tech_iceaxe_desc'), tips: [t('about.tech_iceaxe_tip1'), t('about.tech_iceaxe_tip2'), t('about.tech_iceaxe_tip3')] },
  ];

  const sheltering = [
    { name: t('about.shelter_bivy'), icon: <FaCampground />, desc: t('about.shelter_bivy_desc'), safety: [t('about.shelter_bivy_tip1'), t('about.shelter_bivy_tip2'), t('about.shelter_bivy_tip3')] },
    { name: t('about.shelter_tent'), icon: <GiCampingTent />, desc: t('about.shelter_tent_desc'), safety: [t('about.shelter_tent_tip1'), t('about.shelter_tent_tip2'), t('about.shelter_tent_tip3')] },
    { name: t('about.shelter_cave'), icon: <BsSnow2 />, desc: t('about.shelter_cave_desc'), safety: [t('about.shelter_cave_tip1'), t('about.shelter_cave_tip2'), t('about.shelter_cave_tip3')] },
  ];

  const hazards = [
    { name: t('about.hazard_altitude'), icon: <BsThermometerSnow />, severity: t('about.severity_critical'), color: '#c0392b', desc: t('about.hazard_altitude_desc'), prevention: [t('about.hazard_altitude_prev1'), t('about.hazard_altitude_prev2'), t('about.hazard_altitude_prev3')] },
    { name: t('about.hazard_avalanche'), icon: <GiMountaintop />, severity: t('about.severity_critical'), color: '#c0392b', desc: t('about.hazard_avalanche_desc'), prevention: [t('about.hazard_avalanche_prev1'), t('about.hazard_avalanche_prev2'), t('about.hazard_avalanche_prev3')] },
    { name: t('about.hazard_rockfall'), icon: <GiRock />, severity: t('about.severity_high'), color: '#e67e22', desc: t('about.hazard_rockfall_desc'), prevention: [t('about.hazard_rockfall_prev1'), t('about.hazard_rockfall_prev2'), t('about.hazard_rockfall_prev3')] },
    { name: t('about.hazard_frostbite'), icon: <GiSnowflake1 />, severity: t('about.severity_high'), color: '#e67e22', desc: t('about.hazard_frostbite_desc'), prevention: [t('about.hazard_frostbite_prev1'), t('about.hazard_frostbite_prev2'), t('about.hazard_frostbite_prev3')] },
  ];

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${mountainCampImg})` }}
      >
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span>/</span>
            <span className="breadcrumb-active">{t('nav.about')}</span>
          </div>
          <h1>{t('about.hero_title')}</h1>
          <p>{t('about.hero_subtitle')}</p>
        </div>
      </section>

      {/* ═══ FR-001: Overview ═══ */}
      <section className="section-padding about-overview" id="overview">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 animate-fade-in-up">
              <div className="overview-image-wrapper">
                <img
                  src={overviewSummitImg}
                  alt={t('about.overview_img_alt')}
                  className="overview-image"
                />
                <div className="overview-image-badge">
                  <FaMountain /> {t('about.summit_experience')}
                </div>
              </div>
            </div>
            <div className="col-lg-6 animate-fade-in-up">
              <h2 className="content-title">
                <span className="title-accent">{t('about.what_is')}</span> {t('about.mountaineering')}
              </h2>
              <p className="lead-text">
                {t('about.overview_lead')}
              </p>
              <p>{t('about.overview_p1')}</p>
              <p>{t('about.overview_p2')}</p>
              <div className="overview-highlights">
                <div className="highlight-item">
                  <BsEye className="highlight-icon" />
                  <div>
                    <strong>{t('about.discipline')}</strong>
                    <span>{t('about.discipline_desc')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <FaMountain className="highlight-icon" />
                  <div>
                    <strong>{t('about.adventure')}</strong>
                    <span>{t('about.adventure_desc')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <FaFirstAid className="highlight-icon" />
                  <div>
                    <strong>{t('about.safety')}</strong>
                    <span>{t('about.safety_desc')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FR-002: History ═══ */}
      <section className="section-padding bg-glacier" id="history">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.history_title')}</h2>
            <p>{t('about.history_subtitle')}</p>
          </div>
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-5">
              <img
                src={vintageHistoryImg}
                alt={t('about.history_img_alt')}
                className="history-image"
              />
            </div>
            <div className="col-lg-7">
              <p className="lead-text">{t('about.history_lead')}</p>
            </div>
          </div>
          <div className="timeline-container">
            {historyTimeline.map((item) => (
              <ExpandableSection
                key={item.year}
                title={`${item.year} — ${item.title}`}
                defaultOpen={item.year === '1953'}
              >
                <p>{item.text}</p>
              </ExpandableSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FR-003: Climbing Styles ═══ */}
      <section className="section-padding" id="styles">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.styles_title')}</h2>
            <p>{t('about.styles_subtitle')}</p>
          </div>
          <div className="row g-4">
            {climbingStyles.map((style) => (
              <div className="col-md-6 col-lg-4" key={style.name}>
                <div className="style-card">
                  <div className="style-icon" style={{ background: style.color }}>
                    {style.icon}
                  </div>
                  <h4>{style.name}</h4>
                  <p>{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FR-004: Techniques ═══ */}
      <section className="section-padding bg-navy" id="techniques">
        <div className="container">
          <div className="section-header">
            <h2 style={{ color: '#fff' }}>{t('about.techniques_title')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('about.techniques_subtitle')}
            </p>
          </div>
          <div className="techniques-grid">
            {techniques.map((tech) => (
              <div className="technique-card" key={tech.name}>
                <div className="technique-visual">{tech.visual}</div>
                <div className="technique-content">
                  <div className="technique-icon-name">
                    <span className="technique-icon">{tech.icon}</span>
                    <h4>{tech.name}</h4>
                  </div>
                  <p>{tech.desc}</p>
                  <ul className="technique-tips">
                    {tech.tips.map((tip) => (
                      <li key={tip}>
                        <i className="bi bi-check-circle-fill"></i> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FR-005: Sheltering ═══ */}
      <section className="section-padding" id="sheltering">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.sheltering_title')}</h2>
            <p>{t('about.sheltering_subtitle')}</p>
          </div>
          <div className="row g-4">
            {sheltering.map((s) => (
              <div className="col-lg-4" key={s.name}>
                <div className="shelter-card">
                  <div className="shelter-icon">{s.icon}</div>
                  <h4>{s.name}</h4>
                  <p>{s.desc}</p>
                  <div className="shelter-safety">
                    <h6>
                      <BsShieldExclamation className="me-1" /> {t('about.safety_tips')}
                    </h6>
                    <ul>
                      {s.safety.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FR-006: Hazards ═══ */}
      <section className="section-padding bg-glacier" id="hazards">
        <div className="container">
          <div className="section-header">
            <h2>{t('about.hazards_title')}</h2>
            <p>{t('about.hazards_subtitle')}</p>
          </div>
          <div className="row g-4">
            {hazards.map((h) => (
              <div className="col-md-6" key={h.name}>
                <div className="hazard-card">
                  <div className="hazard-header">
                    <div className="hazard-icon" style={{ background: h.color }}>
                      {h.icon}
                    </div>
                    <div>
                      <h4>{h.name}</h4>
                      <span
                        className="hazard-severity"
                        style={{
                          color: h.color,
                          background: `${h.color}18`,
                          border: `1px solid ${h.color}40`,
                        }}
                      >
                        <FaExclamationTriangle className="me-1" />
                        {h.severity} {t('about.risk')}
                      </span>
                    </div>
                  </div>
                  <p>{h.desc}</p>
                  <div className="hazard-prevention">
                    <h6>{t('about.prevention_response')}</h6>
                    <ul>
                      {h.prevention.map((p) => (
                        <li key={p}>
                          <BsShieldExclamation className="hazard-bullet" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
