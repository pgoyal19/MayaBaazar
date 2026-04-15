import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

const SESSION_KEY = 'maaya_lang_banner_dismissed';

export default function LanguageBanner({ appVisible }) {
  const { t, i18nReady } = useI18n();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  const dismiss = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  if (!appVisible || dismissed || !i18nReady) return null;

  return (
    <div className="lang-prompt-banner" role="region" aria-label={t('lang.switchAria')} data-no-auth-gate>
      <p className="lang-prompt-banner-text">{t('lang.prompt')}</p>
      <div className="lang-prompt-banner-actions">
        <LanguageSwitcher compact />
        <button type="button" className="lang-prompt-banner-ok ui-btn-white shift-hover" onClick={dismiss}>
          {t('lang.bannerOk')}
        </button>
      </div>
    </div>
  );
}
