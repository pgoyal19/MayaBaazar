import React from 'react';
import { useI18n } from '../../context/I18nContext';

export default function LanguageSwitcher({ className = '', compact = false }) {
  const { locale, setLocale, locales, t } = useI18n();

  return (
    <label className={`lang-switcher ${compact ? 'lang-switcher-compact' : ''} ${className}`.trim()} data-no-auth-gate>
      <span className="visually-hidden">{t('lang.switchAria')}</span>
      <select
        className="lang-switcher-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label={t('lang.switchAria')}
      >
        {locales.map((L) => (
          <option key={L.code} value={L.code}>
            {L.native || L.label || L.code}
          </option>
        ))}
      </select>
    </label>
  );
}
