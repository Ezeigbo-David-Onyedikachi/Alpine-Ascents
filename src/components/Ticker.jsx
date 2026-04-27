/**
 * Ticker.jsx — Real-Time Scrolling Ticker Bar
 * 
 * Displays a horizontally scrolling ticker at the bottom of the footer with:
 *   - Current date (formatted by locale)
 *   - Live clock updating every second (formatted by locale)
 *   - User's geographic location (city, country) via browser Geolocation API
 *     and Nominatim reverse geocoding (OpenStreetMap)
 *   - Promotional tagline and booking message
 * 
 * The ticker content is duplicated for seamless CSS animation looping.
 * Falls back to "Location unavailable" if geolocation is denied.
 */

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsCalendar3,
  BsClock,
  BsGeoAlt,
  BsSnow2,
} from 'react-icons/bs';

export default function Ticker() {
  const { t, i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(t('ticker.locating'));
  const locationResolved = useRef(false);

  // Real-time clock — update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update "Locating..." text when language changes (before geolocation resolves)
  useEffect(() => {
    if (!locationResolved.current) {
      setLocation(t('ticker.locating'));
    }
  }, [i18n.language, t]);

  // Geolocation — fetch city & country via reverse geocoding
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(t('ticker.location_unavailable'));
      locationResolved.current = true;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'Unknown';
          const country = data.address?.country || '';
          setLocation(`${city}, ${country}`);
          locationResolved.current = true;
        } catch {
          setLocation(t('ticker.location_unavailable'));
          locationResolved.current = true;
        }
      },
      () => {
        setLocation(t('ticker.location_unavailable'));
        locationResolved.current = true;
      },
      { timeout: 10000 }
    );
  }, [t]);

  const localeCode = i18n.language || 'en';

  // Format date
  const formattedDate = currentTime.toLocaleDateString(localeCode, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time
  const formattedTime = currentTime.toLocaleTimeString(localeCode, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const items = [
    { icon: <BsSnow2 />, text: t('ticker.tagline') },
    { icon: <BsCalendar3 />, text: formattedDate },
    { icon: <BsClock />, text: formattedTime },
    { icon: <BsGeoAlt />, text: location },
    { icon: <BsSnow2 />, text: t('ticker.book_message') },
  ];

  return (
    <div className="ticker-bar">
      <div className="ticker-content">
        {items.map((item, i) => (
          <span className="ticker-item" key={i}>
            {item.icon} <span>{item.text}</span>
          </span>
        ))}
        {/* Duplicate for seamless scroll */}
        {items.map((item, i) => (
          <span className="ticker-item" key={`dup-${i}`} aria-hidden="true">
            {item.icon} <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
