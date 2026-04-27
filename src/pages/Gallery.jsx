/**
 * Gallery.jsx — Photo & Video Gallery Page
 * 
 * Media showcase page with:
 *   - 9 photographs from Unsplash with category filtering (Landscape, Climbing, Team, Camp)
 *   - Lightbox modal with prev/next navigation and image counter
 *   - 4 YouTube video embeds with click-to-play thumbnail interaction
 * 
 * State management handles lightbox index, filter selection, and active video.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaExpand,
} from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';

// Local image assets
import mountainPeaksImg from '../assets/images/mountain-peaks.jpg';
import snowMountainImg from '../assets/images/snow-mountain.jpg';
import climbingAdventureImg from '../assets/images/climbing-adventure.jpg';
import starryMountainImg from '../assets/images/starry-mountain.jpg';
import mountainTeamImg from '../assets/images/mountain-team.jpg';
import alpineLakeImg from '../assets/images/alpine-lake.jpg';
import mountainCampImg from '../assets/images/mountain-camp.jpg';
import mistyPeaksImg from '../assets/images/misty-peaks.jpg';
import blueMountainsImg from '../assets/images/blue-mountains.jpg';

export default function Gallery() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [playingVideo, setPlayingVideo] = useState(null);

  const photos = [
    { id: 1, src: mountainPeaksImg, thumb: mountainPeaksImg, caption: t('gallery.caption_1'), categoryKey: 'Landscape' },
    { id: 2, src: snowMountainImg, thumb: snowMountainImg, caption: t('gallery.caption_2'), categoryKey: 'Landscape' },
    { id: 3, src: climbingAdventureImg, thumb: climbingAdventureImg, caption: t('gallery.caption_3'), categoryKey: 'Climbing' },
    { id: 4, src: starryMountainImg, thumb: starryMountainImg, caption: t('gallery.caption_4'), categoryKey: 'Landscape' },
    { id: 5, src: mountainTeamImg, thumb: mountainTeamImg, caption: t('gallery.caption_5'), categoryKey: 'Team' },
    { id: 6, src: alpineLakeImg, thumb: alpineLakeImg, caption: t('gallery.caption_6'), categoryKey: 'Landscape' },
    { id: 7, src: mountainCampImg, thumb: mountainCampImg, caption: t('gallery.caption_7'), categoryKey: 'Camp' },
    { id: 8, src: mistyPeaksImg, thumb: mistyPeaksImg, caption: t('gallery.caption_8'), categoryKey: 'Climbing' },
    { id: 9, src: blueMountainsImg, thumb: blueMountainsImg, caption: t('gallery.caption_9'), categoryKey: 'Landscape' },
  ];

  const videos = [
    { id: 'v1', type: 'youtube', embedId: 'a-Qg4Gw9U-Y', title: t('gallery.video_1_title'), thumbnail: mountainCampImg },
    { id: 'v2', type: 'youtube', embedId: 'de148qvjvYw', title: t('gallery.video_2_title'), thumbnail: snowMountainImg },
    { id: 'v3', type: 'youtube', embedId: 'DJkbST_Tt5c', title: t('gallery.video_3_title'), thumbnail: mistyPeaksImg },
    { id: 'v4', type: 'youtube', embedId: 'OzAXbbnyHiI', title: t('gallery.video_4_title'), thumbnail: climbingAdventureImg },
  ];

  const categoryMap = {
    Landscape: t('gallery.filter_landscape'),
    Climbing: t('gallery.filter_climbing'),
    Team: t('gallery.filter_team'),
    Camp: t('gallery.filter_camp'),
  };

  const categories = [
    { key: 'All', label: t('gallery.filter_all') },
    ...['Landscape', 'Climbing', 'Team', 'Camp']
      .filter((k) => photos.some((p) => p.categoryKey === k))
      .map((k) => ({ key: k, label: categoryMap[k] })),
  ];

  const filteredPhotos = filter === 'All' ? photos : photos.filter((p) => p.categoryKey === filter);

  const openLightbox = (index) => { setLightboxIndex(index); setLightbox(filteredPhotos[index]); };
  const closeLightbox = () => { setLightbox(null); };
  const nextImage = () => { const next = (lightboxIndex + 1) % filteredPhotos.length; setLightboxIndex(next); setLightbox(filteredPhotos[next]); };
  const prevImage = () => { const prev = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length; setLightboxIndex(prev); setLightbox(filteredPhotos[prev]); };

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${blueMountainsImg})` }}
      >
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span>/</span>
            <span className="breadcrumb-active">{t('nav.gallery')}</span>
          </div>
          <h1>{t('gallery.hero_title')}</h1>
          <p>{t('gallery.hero_subtitle')}</p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-padding" id="photos">
        <div className="container">
          <div className="section-header">
            <h2>{t('gallery.photo_gallery')}</h2>
            <p>{t('gallery.photo_subtitle')}</p>
          </div>
          <div className="expedition-filters mb-4">
            <BsFilter className="me-2 text-muted" style={{ fontSize: '1.2rem' }} />
            {categories.map((cat) => (
              <button key={cat.key} className={`filter-btn ${filter === cat.key ? 'active' : ''}`} onClick={() => setFilter(cat.key)}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filteredPhotos.map((photo, i) => (
              <div className="gallery-item" key={photo.id} onClick={() => openLightbox(i)}>
                <img src={photo.thumb} alt={photo.caption} loading="lazy" />
                <div className="gallery-overlay">
                  <FaExpand className="gallery-expand-icon" />
                  <span>{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="section-padding bg-navy" id="videos">
        <div className="container">
          <div className="section-header">
            <h2 style={{ color: '#fff' }}>{t('gallery.expedition_videos')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('gallery.videos_subtitle')}</p>
          </div>
          <div className="row g-4 justify-content-center">
            {videos.map((video) => (
              <div className="col-md-6" key={video.id}>
                <div className="video-card">
                  {playingVideo === video.id ? (
                    <div className="video-embed">
                      <iframe src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`} title={video.title} frameBorder="0" allow="accelerometer; clipboard-write; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  ) : (
                    <div className="video-thumbnail" onClick={() => setPlayingVideo(video.id)}>
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="video-play-btn"><FaPlay /></div>
                    </div>
                  )}
                  <div className="video-card-body"><h5>{video.title}</h5></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close"><FaTimes /></button>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage} aria-label="Previous"><FaChevronLeft /></button>
            <img src={lightbox.src} alt={lightbox.caption} className="lightbox-image" />
            <button className="lightbox-nav lightbox-next" onClick={nextImage} aria-label="Next"><FaChevronRight /></button>
            <div className="lightbox-caption">
              {lightbox.caption}
              <span className="lightbox-counter">{lightboxIndex + 1} / {filteredPhotos.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
