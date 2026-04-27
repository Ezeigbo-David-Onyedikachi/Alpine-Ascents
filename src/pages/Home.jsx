/**
 * Home.jsx — Landing Page
 * 
 * The main landing page featuring:
 *   - Full-screen hero section with parallax background, CTA buttons
 *   - Stats bar (150+ summits, 20+ years, 500+ climbers, 98% success rate)
 *   - Featured expeditions (3 cards: Everest, Mont Blanc, Kilimanjaro)
 *   - "Why Alpine Ascents" feature grid (Safety, Guides, Routes, Global Reach)
 *   - Testimonials carousel (3 client reviews with star ratings)
 *   - Latest news section (top 3 articles from news.json)
 *   - Call-to-action banner linking to /contact
 * 
 * All text is translation-aware via the t() function from react-i18next.
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaMountain,
  FaShieldAlt,
  FaUsers,
  FaGlobeAmericas,
} from 'react-icons/fa';
import { BsStarFill, BsStarHalf, BsArrowRight, BsClock } from 'react-icons/bs';
import newsData from '../data/news.json';

// Local image assets
import snowMountainImg from '../assets/images/snow-mountain.jpg';
import mountainPeaksImg from '../assets/images/mountain-peaks.jpg';
import mountainTeamImg from '../assets/images/mountain-team.jpg';
import climbingAdventureImg from '../assets/images/climbing-adventure.jpg';
import starryMountainImg from '../assets/images/starry-mountain.jpg';

// Map news.json imageKey → imported asset
const newsImageMap = {
  'climbing-adventure': climbingAdventureImg,
  'mountain-peaks': mountainPeaksImg,
  'starry-mountain': starryMountainImg,
  'snow-mountain': snowMountainImg,
  'mountain-team': mountainTeamImg,
};

const categoryColors = {
  Equipment: 'var(--color-stone)',
  Discovery: 'var(--color-forest)',
  Innovation: '#6c5ce7',
  Expedition: 'var(--color-danger)',
};

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  return (
    <div className="testimonial-stars">
      {Array.from({ length: fullStars }, (_, i) => (
        <BsStarFill key={i} className="me-1" />
      ))}
      {hasHalf && <BsStarHalf className="me-1" />}
    </div>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();

  const stats = [
    { number: '150+', label: t('home.summits_reached') },
    { number: '20+', label: t('home.years_experience') },
    { number: '500+', label: t('home.happy_climbers') },
    { number: '98%', label: t('home.success_rate') },
  ];

  const featuredExpeditions = [
    {
      titleKey: 'home.exp_everest_title',
      difficultyKey: 'moderate',
      days: 14,
      price: '$3,200',
      image: snowMountainImg,
    },
    {
      titleKey: 'home.exp_montblanc_title',
      difficultyKey: 'challenging',
      days: 7,
      price: '$2,800',
      image: mountainPeaksImg,
    },
    {
      titleKey: 'home.exp_kilimanjaro_title',
      difficultyKey: 'moderate',
      days: 8,
      price: '$2,500',
      image: mountainTeamImg,
    },
  ];

  const testimonials = [
    {
      text: t('home.testimonial_1_text'),
      author: t('home.testimonial_1_author'),
      expedition: t('home.testimonial_1_expedition'),
      rating: 5,
    },
    {
      text: t('home.testimonial_2_text'),
      author: t('home.testimonial_2_author'),
      expedition: t('home.testimonial_2_expedition'),
      rating: 5,
    },
    {
      text: t('home.testimonial_3_text'),
      author: t('home.testimonial_3_author'),
      expedition: t('home.testimonial_3_expedition'),
      rating: 4.5,
    },
  ];

  const features = [
    {
      icon: <FaShieldAlt />,
      title: t('home.safety_first'),
      desc: t('home.safety_desc'),
    },
    {
      icon: <FaUsers />,
      title: t('home.expert_guides'),
      desc: t('home.expert_guides_desc'),
    },
    {
      icon: <FaMountain />,
      title: t('home.epic_routes'),
      desc: t('home.epic_routes_desc'),
    },
    {
      icon: <FaGlobeAmericas />,
      title: t('home.global_reach'),
      desc: t('home.global_reach_desc'),
    },
  ];

  const localeCode = i18n.language || 'en';

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <h1>
            {t('home.hero_title_1')} <span>{t('home.hero_title_2')}</span>
          </h1>
          <p className="hero-tagline">
            {t('home.hero_subtitle')}
          </p>
          <div className="hero-buttons">
            <Link to="/expeditions" className="btn btn-alpine">
              {t('home.explore_expeditions')}
            </Link>
            <Link to="/about" className="btn btn-alpine-outline">
              {t('home.our_story')}
            </Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <i className="bi bi-chevron-double-down"></i>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar">
        <div className="container">
          <div className="row">
            {stats.map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <div className="stat-item animate-fade-in-up">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED EXPEDITIONS ===== */}
      <section className="section-padding" style={{ background: 'var(--color-off-white)' }}>
        <div className="container">
          <div className="section-header">
            <h2>{t('home.featured_expeditions')}</h2>
            <p>{t('home.featured_subtitle')}</p>
          </div>
          <div className="row g-4">
            {featuredExpeditions.map((exp) => (
              <div className="col-md-6 col-lg-4" key={exp.titleKey}>
                <div className="alpine-card h-100">
                  <div style={{ overflow: 'hidden' }}>
                    <img src={exp.image} className="card-img-top" alt={t(exp.titleKey)} />
                  </div>
                  <div className="card-body p-4">
                    <span
                      className="badge mb-2"
                      style={{
                        background: exp.difficultyKey === 'challenging'
                          ? 'var(--color-danger)'
                          : 'var(--color-forest)',
                        color: '#fff',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      {t(`home.${exp.difficultyKey}`)}
                    </span>
                    <h4 className="mt-1">{t(exp.titleKey)}</h4>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        <i className="bi bi-calendar3 me-1"></i> {exp.days} {t('home.days')}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          color: 'var(--color-forest)',
                          fontSize: '1.2rem',
                          fontWeight: 700,
                        }}
                      >
                        {exp.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/expeditions" className="btn btn-alpine">
              {t('home.view_all_expeditions')} <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY ALPINE ASCENTS ===== */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.why_title')}</h2>
            <p>{t('home.why_subtitle')}</p>
          </div>
          <div className="row g-4">
            {features.map((f) => (
              <div className="col-sm-6 col-lg-3" key={f.title}>
                <div className="feature-card h-100">
                  <div className="feature-icon">{f.icon}</div>
                  <h4 style={{ fontSize: '1.15rem' }}>{f.title}</h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.what_climbers_say')}</h2>
            <p>{t('home.testimonials_subtitle')}</p>
          </div>
          <div className="row g-4">
            {testimonials.map((item) => (
              <div className="col-md-6 col-lg-4" key={item.author}>
                <div className="testimonial-card h-100">
                  <StarRating rating={item.rating} />
                  <p className="testimonial-text">{item.text}</p>
                  <div>
                    <div className="testimonial-author">{item.author}</div>
                    <div className="testimonial-expedition">{item.expedition}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="section-padding bg-off-white" id="news">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.latest_news')}</h2>
            <p>{t('home.news_subtitle')}</p>
          </div>
          <div className="row g-4">
            {newsData.slice(0, 3).map((article) => (
              <div className="col-md-6 col-lg-4" key={article.id}>
                <div className="news-card">
                  <div className="news-card-img">
                    <img src={newsImageMap[article.imageKey]} alt={t(`news.article_${article.id}_title`)} />
                    <span
                      className="news-category"
                      style={{ background: categoryColors[article.category] || 'var(--color-navy)' }}
                    >
                      {t(`news.article_${article.id}_category`)}
                    </span>
                  </div>
                  <div className="news-card-body">
                    <div className="news-meta">
                      <span>{new Date(article.date).toLocaleDateString(localeCode, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span><BsClock className="me-1" />{t(`news.article_${article.id}_read_time`)}</span>
                    </div>
                    <h4>{t(`news.article_${article.id}_title`)}</h4>
                    <p>{t(`news.article_${article.id}_excerpt`)}</p>
                    <span className="news-author">{t('common.by')} {article.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="container">
          <h2>{t('home.ready_for_adventure')}</h2>
          <p>{t('home.cta_subtitle')}</p>
          <Link to="/contact" className="btn btn-alpine">
            {t('home.start_planning')} <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>
    </>
  );
}
