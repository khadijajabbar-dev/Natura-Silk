import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import client from '../api/client';

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  const refresh = useCallback(() => {
    client.get('/settings').then((r) => setSettings(r.data.settings)).catch(() => {});
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <SiteSettingsContext.Provider value={{ settings, refresh }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

// Returns the live settings object (or null until the first fetch resolves).
export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  return ctx ? ctx.settings : null;
}

// Convenience: read a single setting with a fallback default while loading.
export function useSetting(key, fallback = '') {
  const settings = useSiteSettings();
  return settings && settings[key] !== undefined ? settings[key] : fallback;
}

export function useSiteSettingsRefresh() {
  const ctx = useContext(SiteSettingsContext);
  return ctx ? ctx.refresh : () => {};
}

// Applies the SEO Title / SEO Description settings to the actual page —
// sets document.title and the <meta name="description"> tag. Call this
// once near the top of the app so every page benefits from it.
export function useApplySEO() {
  const settings = useSiteSettings();

  useEffect(() => {
    if (!settings) return;

    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }

    if (settings.seoDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', settings.seoDescription);
    }
  }, [settings]);
}
