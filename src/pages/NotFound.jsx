/**
 * NotFound.jsx — 404 Error Page
 * 
 * Displayed when the user navigates to an undefined route.
 * Shows a "404" heading, a mountain icon, a friendly message,
 * and a "Return to Home" button linking to /.
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AlpineLogo from '../components/AlpineLogo';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="not-found-page">
      <div className="animate-fade-in-up">
        <h1>404</h1>
        <AlpineLogo size={64} light={false} />
        <h2>{t('notfound.title')}</h2>
        <p>{t('notfound.message')}</p>
        <Link to="/" className="btn btn-alpine">
          {t('notfound.go_home')}
        </Link>
      </div>
    </section>
  );
}
