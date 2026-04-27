/**
 * LanguageSelector.jsx — Language Dropdown Selector
 * 
 * Custom dropdown component for switching between 6 supported languages:
 * English (UK), English (US), French, Spanish, German, and Hindi.
 * Displays country flags via flagcdn.com and the locale code.
 * Changes are applied via i18next.changeLanguage() and persisted in localStorage.
 */

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English (UK)', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'en-US', label: 'English (US)', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'de', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'hi', label: 'हिन्दी', flag: 'https://flagcdn.com/w40/in.png' },
];

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current =
    languages.find((l) => l.code === i18n.language) ||
    languages.find((l) => l.code === i18n.language?.slice(0, 2)) ||
    languages[0];

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const switchLang = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="lang-toggle"
        onClick={() => setOpen(!open)}
        aria-label={t('common.aria_select_language')}
        aria-expanded={open}
      >
        <img src={current.flag} alt="" className="lang-flag-img" width="20" height="14" />
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{ marginLeft: 4 }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="lang-dropdown" role="listbox" aria-label={t('common.aria_languages')}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${lang.code === current.code ? 'active' : ''}`}
              onClick={() => switchLang(lang.code)}
              role="option"
              aria-selected={lang.code === current.code}
            >
              <img src={lang.flag} alt="" className="lang-flag-img" width="20" height="14" />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
