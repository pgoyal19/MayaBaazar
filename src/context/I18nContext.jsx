import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const STORAGE_KEY = 'maaya_locale';

function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

async function fetchJson(path) {
  const res = await fetch(apiUrl(path), { credentials: 'same-origin' });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  return { res, data };
}

function applyParams(str, params) {
  if (typeof str !== 'string' || !params) return str;
  let out = str;
  for (const [k, v] of Object.entries(params)) {
    out = out.replaceAll(`{{${k}}}`, String(v));
  }
  return out;
}

const I18nContext = createContext(null);

const DEFAULT_CATALOG = {
  defaultLocale: 'en',
  locales: [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ],
};

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && /^[a-z]{2}(-[a-z]{2,8})?$/.test(stored)) return stored;
    } catch {
      /* ignore */
    }
    return DEFAULT_CATALOG.defaultLocale;
  });
  const [messages, setMessages] = useState({});
  const [catalog, setCatalog] = useState(DEFAULT_CATALOG);
  const [i18nReady, setI18nReady] = useState(false);

  const setLocale = useCallback((code) => {
    const next = String(code || '').toLowerCase();
    if (!/^[a-z]{2}(-[a-z]{2,8})?$/.test(next)) return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale.split('-')[0] || 'en';
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { res, data } = await fetchJson('/api/i18n/locales');
        if (cancelled || !res.ok || !data?.ok) return;
        setCatalog({
          defaultLocale: data.defaultLocale || 'en',
          locales: Array.isArray(data.locales) && data.locales.length ? data.locales : DEFAULT_CATALOG.locales,
        });
      } catch {
        /* keep DEFAULT_CATALOG */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setI18nReady(false);
      try {
        const { res, data } = await fetchJson(`/api/i18n/bundles/${encodeURIComponent(locale)}`);
        if (cancelled) return;
        if (res.ok && data?.ok && data.messages && typeof data.messages === 'object') {
          setMessages(data.messages);
        } else {
          setMessages({});
        }
      } catch {
        if (!cancelled) setMessages({});
      } finally {
        if (!cancelled) setI18nReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const t = useCallback(
    (key, params) => {
      const raw = messages[key];
      if (raw == null) return key;
      return applyParams(raw, params);
    },
    [messages]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: catalog.locales,
      defaultLocale: catalog.defaultLocale,
      t,
      i18nReady,
    }),
    [locale, setLocale, catalog.locales, catalog.defaultLocale, t, i18nReady]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- standard context hook export
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
