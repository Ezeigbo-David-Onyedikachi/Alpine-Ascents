/**
 * Team.jsx — Team & Organizations Page
 * 
 * Two main sections:
 *   1. Expert Guides: 4 team member cards with photo, name, role, bio
 *      - Role-based filter (All, Lead Guide, Technical Director, etc.)
 *   2. Mountaineering Organizations: 8 clubs from clubs.json
 *      - Interactive Leaflet world map with markers and popups
 *      - Club cards with name, location, description, founding year, member count
 *      - External website links for each organization
 * 
 * Uses React Leaflet (MapContainer, TileLayer, Marker, Popup) for the map.
 * Map tiles are sourced from OpenStreetMap.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  FaGlobeAmericas,
  FaUsers,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaFilter,
} from 'react-icons/fa';
import { BsCalendar3 } from 'react-icons/bs';
import clubsData from '../data/clubs.json';

// Local image assets
import teamMarcusImg from '../assets/images/team-marcus.jpg';
import teamAishaImg from '../assets/images/team-aisha.jpg';
import teamErikImg from '../assets/images/team-erik.jpg';
import teamMeiImg from '../assets/images/team-mei.jpg';
import climbingAdventureImg from '../assets/images/climbing-adventure.jpg';

/* Fix Leaflet default marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Team() {
  const { t } = useTranslation();

  const roleMap = {
    'Lead Guide': t('team.role_lead_guide'),
    'Technical Director': t('team.role_tech_director'),
    'Expedition Manager': t('team.role_exp_manager'),
    'Safety Officer': t('team.role_safety_officer'),
  };

  const teamMembers = [
    { name: 'Marcus Sullivan', roleKey: 'Lead Guide', bio: t('team.bio_marcus'), photo: teamMarcusImg },
    { name: 'Aisha Patel', roleKey: 'Technical Director', bio: t('team.bio_aisha'), photo: teamAishaImg },
    { name: 'Erik Johansson', roleKey: 'Expedition Manager', bio: t('team.bio_erik'), photo: teamErikImg },
    { name: 'Mei Lin Chen', roleKey: 'Safety Officer', bio: t('team.bio_mei'), photo: teamMeiImg },
  ];

  const [roleFilter, setRoleFilter] = useState('All');
  const roles = [
    { key: 'All', label: t('team.filter_all') },
    ...Object.keys(roleMap).map((k) => ({ key: k, label: roleMap[k] })),
  ];
  const filteredTeam = roleFilter === 'All'
    ? teamMembers
    : teamMembers.filter((m) => m.roleKey === roleFilter);

  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${climbingAdventureImg})` }}
      >
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span>/</span>
            <span className="breadcrumb-active">{t('nav.team')}</span>
          </div>
          <h1>{t('team.hero_title')}</h1>
          <p>{t('team.hero_subtitle')}</p>
        </div>
      </section>

      {/* ═══ Team Grid ═══ */}
      <section className="section-padding" id="team">
        <div className="container">
          <div className="section-header">
            <h2>{t('team.expert_guides')}</h2>
            <p>{t('team.guides_subtitle')}</p>
          </div>

          {/* Role Filter */}
          <div className="expedition-filters mb-4">
            <FaFilter className="me-2 text-muted" />
            {roles.map((r) => (
              <button
                key={r.key}
                className={`filter-btn ${roleFilter === r.key ? 'active' : ''}`}
                onClick={() => setRoleFilter(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredTeam.map((member) => (
              <div className="col-sm-6 col-lg-3" key={member.name}>
                <div className="team-card">
                  <div className="team-card-img">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <div className="team-card-body">
                    <h4>{member.name}</h4>
                    <span className="team-role">{roleMap[member.roleKey]}</span>
                    <p>{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FR-008: Clubs & Map ═══ */}
      <section className="section-padding bg-glacier" id="clubs">
        <div className="container">
          <div className="section-header">
            <h2>{t('team.organizations_title')}</h2>
            <p>{t('team.organizations_subtitle')}</p>
          </div>

          {/* Interactive Map */}
          <div className="clubs-map-wrapper mb-5">
            <MapContainer
              center={[30, 10]}
              zoom={2}
              scrollWheelZoom={false}
              style={{ height: '420px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {clubsData.map((club) => (
                <Marker
                  key={club.id}
                  position={[club.lat, club.lng]}
                  eventHandlers={{ click: () => setSelectedClub(club) }}
                >
                  <Popup>
                    <div className="map-popup">
                      <strong style={{ fontSize: '0.95rem' }}>{club.name}</strong>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.82rem', color: '#555' }}>
                        <FaMapMarkerAlt className="me-1" />{club.city}, {club.country}
                      </p>
                      <p style={{ fontSize: '0.8rem', margin: 0 }}>{t(`clubs.${club.id}_desc`)}</p>
                      <div style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}>
                        <BsCalendar3 className="me-1" />{t('team.founded')}: {club.founded} &nbsp;|&nbsp;
                        <FaUsers className="me-1" />{club.members}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Club Cards */}
          <div className="row g-4">
            {clubsData.map((club) => (
              <div className="col-md-6 col-lg-4" key={club.id}>
                <div
                  className={`club-card ${selectedClub?.id === club.id ? 'selected' : ''}`}
                  onClick={() => setSelectedClub(club)}
                >
                  <div className="club-card-header">
                    <FaGlobeAmericas className="club-icon" />
                    <div>
                      <h5>{club.name}</h5>
                      <span className="club-location">
                        <FaMapMarkerAlt className="me-1" />
                        {club.city}, {club.country}
                      </span>
                    </div>
                  </div>
                  <p className="club-desc">{t(`clubs.${club.id}_desc`)}</p>
                  <div className="club-meta">
                    <span><BsCalendar3 className="me-1" />{t('team.established')} {club.founded}</span>
                    <span><FaUsers className="me-1" />{club.members}</span>
                  </div>
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="club-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('team.visit_website')} <FaExternalLinkAlt className="ms-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
