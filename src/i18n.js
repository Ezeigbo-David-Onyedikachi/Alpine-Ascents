/**
 * i18n.js — Internationalization Configuration
 * 
 * Initializes i18next with 6 language bundles: en, en-US, fr, es, de, hi.
 * Uses browser language detection (localStorage first, then navigator.language)
 * with 'en' as the fallback language. Translation files are imported statically
 * from src/locales/{locale}/translation.json.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import enUS from './locales/en-US/translation.json';
import fr from './locales/fr/translation.json';
import es from './locales/es/translation.json';
import de from './locales/de/translation.json';
import hi from './locales/hi/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'en-US': { translation: enUS },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
      hi: { translation: hi },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
