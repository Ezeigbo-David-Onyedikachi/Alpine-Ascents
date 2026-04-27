/**
 * Expeditions.jsx — Expedition Catalog & Records Page
 * 
 * Features two main sections:
 *   1. Records Section:
 *      - 4 altitude record stat cards
 *      - Speed records table (Everest, K2, Mont Blanc, Denali)
 *      - First ascents grid (6 historic climbs from 1786–1955)
 *   2. Expedition Catalog:
 *      - 6 expedition cards with image, difficulty badge, duration, price
 *      - Region-based filter bar (All, Nepal, France/Italy, Tanzania, etc.)
 * 
 * Uses ToggleSection sub-component for collapsible record groups.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaTrophy,
  FaMountain,
  FaClock,
  FaFlag,
  FaArrowUp,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { BsStarFill, BsCalendar3 } from 'react-icons/bs';

// Local image assets
import snowMountainImg from '../assets/images/snow-mountain.jpg';
import mountainPeaksImg from '../assets/images/mountain-peaks.jpg';
import mountainTeamImg from '../assets/images/mountain-team.jpg';
import starryMountainImg from '../assets/images/starry-mountain.jpg';
import climbingAdventureImg from '../assets/images/climbing-adventure.jpg';
import alpineLakeImg from '../assets/images/alpine-lake.jpg';

/* ─── Toggle Section ─── */
function ToggleSection({ title, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="records-toggle">
      <button className="records-toggle-header" onClick={() => setOpen(!open)}>
        <span className="records-toggle-title">{icon} {title}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && <div className="records-toggle-body">{children}</div>}
    </div>
  );
}

const difficultyColors = {
  Moderate: 'var(--color-forest)',
  Challenging: '#e67e22',
  Expert: 'var(--color-danger)',
};

export default function Expeditions() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');

  const speedRecords = [
    { peak: 'Mount Everest', record: t('expeditions.speed_everest_record'), holder: t('expeditions.speed_everest_holder'), year: 2024, from: t('expeditions.speed_everest_from'), altitude: '8,849 m' },
    { peak: 'K2', record: t('expeditions.speed_k2_record'), holder: t('expeditions.speed_k2_holder'), year: 2023, from: t('expeditions.speed_k2_from'), altitude: '8,611 m' },
    { peak: 'Mont Blanc', record: t('expeditions.speed_montblanc_record'), holder: t('expeditions.speed_montblanc_holder'), year: 2023, from: t('expeditions.speed_montblanc_from'), altitude: '4,808 m' },
    { peak: 'Denali', record: t('expeditions.speed_denali_record'), holder: t('expeditions.speed_denali_holder'), year: 2019, from: t('expeditions.speed_denali_from'), altitude: '6,190 m' },
  ];

  const firstAscents = [
    { peak: 'Mont Blanc', year: 1786, climbers: 'Balmat & Paccard', altitude: '4,808 m' },
    { peak: 'Matterhorn', year: 1865, climbers: 'Edward Whymper', altitude: '4,478 m' },
    { peak: 'Mount Everest', year: 1953, climbers: 'Hillary & Tenzing', altitude: '8,849 m' },
    { peak: 'K2', year: 1954, climbers: 'Compagnoni & Lacedelli', altitude: '8,611 m' },
    { peak: 'Kangchenjunga', year: 1955, climbers: 'Band & Brown', altitude: '8,586 m' },
    { peak: 'Annapurna', year: 1950, climbers: 'Herzog & Lachenal', altitude: '8,091 m' },
  ];

  const altitudeRecords = [
    { record: t('expeditions.alt_highest_summit'), value: '8,849 m', detail: t('expeditions.alt_highest_summit_detail'), icon: <FaMountain /> },
    { record: t('expeditions.alt_without_o2'), value: '8,849 m', detail: t('expeditions.alt_without_o2_detail'), icon: <FaArrowUp /> },
    { record: t('expeditions.alt_most_8000ers'), value: '14 peaks', detail: t('expeditions.alt_most_8000ers_detail'), icon: <FaTrophy /> },
    { record: t('expeditions.alt_youngest'), value: '16 years', detail: t('expeditions.alt_youngest_detail'), icon: <BsStarFill /> },
  ];

  const expeditions = [
    { titleKey: 'expeditions.exp_everest_title', descKey: 'expeditions.exp_everest_desc', difficulty: 'Moderate', days: 14, price: '$3,200', altitude: '5,364 m', region: 'Nepal', image: snowMountainImg },
    { titleKey: 'expeditions.exp_montblanc_title', descKey: 'expeditions.exp_montblanc_desc', difficulty: 'Challenging', days: 7, price: '$2,800', altitude: '4,808 m', region: 'France/Italy', image: mountainPeaksImg },
    { titleKey: 'expeditions.exp_kilimanjaro_title', descKey: 'expeditions.exp_kilimanjaro_desc', difficulty: 'Moderate', days: 8, price: '$2,500', altitude: '5,895 m', region: 'Tanzania', image: mountainTeamImg },
    { titleKey: 'expeditions.exp_patagonia_title', descKey: 'expeditions.exp_patagonia_desc', difficulty: 'Challenging', days: 10, price: '$3,500', altitude: '3,405 m', region: 'Argentina', image: starryMountainImg },
    { titleKey: 'expeditions.exp_denali_title', descKey: 'expeditions.exp_denali_desc', difficulty: 'Expert', days: 21, price: '$6,800', altitude: '6,190 m', region: 'Alaska, USA', image: climbingAdventureImg },
    { titleKey: 'expeditions.exp_matterhorn_title', descKey: 'expeditions.exp_matterhorn_desc', difficulty: 'Expert', days: 5, price: '$4,200', altitude: '4,478 m', region: 'Switzerland', image: alpineLakeImg },
  ];

  const difficultyTranslations = {
    Moderate: t('expeditions.difficulty_moderate'),
    Challenging: t('expeditions.difficulty_challenging'),
    Expert: t('expeditions.difficulty_expert'),
  };

  const regions = [t('expeditions.filter_all'), ...new Set(expeditions.map((e) => e.region))];
  const filtered = filter === t('expeditions.filter_all') || filter === 'All' ? expeditions : expeditions.filter((e) => e.region === filter);

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${snowMountainImg})` }}
      >
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span>/</span>
            <span className="breadcrumb-active">{t('nav.expeditions')}</span>
          </div>
          <h1>{t('expeditions.hero_title')}</h1>
          <p>{t('expeditions.hero_subtitle')}</p>
        </div>
      </section>

      {/* ═══ FR-007: Records ═══ */}
      <section className="section-padding bg-glacier" id="records">
        <div className="container">
          <div className="section-header">
            <h2>{t('expeditions.records_title')}</h2>
            <p>{t('expeditions.records_subtitle')}</p>
          </div>

          {/* Altitude Record Cards */}
          <div className="row g-4 mb-5">
            {altitudeRecords.map((r) => (
              <div className="col-sm-6 col-lg-3" key={r.record}>
                <div className="record-stat-card">
                  <div className="record-stat-icon">{r.icon}</div>
                  <div className="record-stat-value">{r.value}</div>
                  <div className="record-stat-label">{r.record}</div>
                  <div className="record-stat-detail">{r.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Speed Records */}
          <ToggleSection title={t('expeditions.speed_records')} icon={<FaClock />} defaultOpen={true}>
            <div className="table-responsive">
              <table className="table records-table">
                <thead>
                  <tr>
                    <th>{t('expeditions.peak')}</th>
                    <th>{t('expeditions.record')}</th>
                    <th>{t('expeditions.holder')}</th>
                    <th>{t('expeditions.year')}</th>
                    <th>{t('expeditions.route')}</th>
                  </tr>
                </thead>
                <tbody>
                  {speedRecords.map((r) => (
                    <tr key={r.peak}>
                      <td><strong>{r.peak}</strong><br /><small>{r.altitude}</small></td>
                      <td className="text-stone fw-bold">{r.record}</td>
                      <td>{r.holder}</td>
                      <td>{r.year}</td>
                      <td><small>{r.from}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ToggleSection>

          {/* First Ascents */}
          <ToggleSection title={t('expeditions.first_ascents')} icon={<FaFlag />} defaultOpen={true}>
            <div className="row g-3">
              {firstAscents.map((a) => (
                <div className="col-sm-6 col-lg-4" key={a.peak}>
                  <div className="first-ascent-card">
                    <div className="first-ascent-year">
                      <BsCalendar3 className="me-1" /> {a.year}
                    </div>
                    <h5>{a.peak}</h5>
                    <p className="mb-1"><strong>{a.climbers}</strong></p>
                    <small className="text-muted">{a.altitude}</small>
                  </div>
                </div>
              ))}
            </div>
          </ToggleSection>
        </div>
      </section>

      {/* ═══ Expedition Cards ═══ */}
      <section className="section-padding" id="expeditions">
        <div className="container">
          <div className="section-header">
            <h2>{t('expeditions.our_expeditions')}</h2>
            <p>{t('expeditions.expeditions_subtitle')}</p>
          </div>

          {/* Filter Bar */}
          <div className="expedition-filters">
            {regions.map((r) => (
              <button
                key={r}
                className={`filter-btn ${filter === r ? 'active' : ''}`}
                onClick={() => setFilter(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filtered.map((exp) => (
              <div className="col-md-6 col-lg-4" key={exp.titleKey}>
                <div className="alpine-card h-100">
                  <div style={{ overflow: 'hidden' }}>
                    <img src={exp.image} className="card-img-top" alt={t(exp.titleKey)} />
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span
                        className="badge"
                        style={{ background: difficultyColors[exp.difficulty], color: '#fff', fontSize: '0.75rem' }}
                      >
                        {difficultyTranslations[exp.difficulty]}
                      </span>
                      <small className="text-muted">{exp.region}</small>
                    </div>
                    <h4 className="mt-1" style={{ fontSize: '1.1rem' }}>{t(exp.titleKey)}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)' }}>{t(exp.descKey)}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <i className="bi bi-calendar3 me-1"></i> {exp.days} {t('expeditions.days')} &mdash; {exp.altitude}
                      </span>
                      <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-stone)', fontSize: '1.15rem', fontWeight: 700 }}>
                        {exp.price}
                      </span>
                    </div>
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
