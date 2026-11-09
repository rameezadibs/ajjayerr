import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations, servicesArabicData } from '../locales/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Initialize from localStorage if present, default to 'en'
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ajjayer_lang');
      if (stored === 'ar' || stored === 'en') return stored;
    }
    return 'en';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const isRTL = lang === 'ar';

  const setLang = useCallback((newLang) => {
    if (newLang === 'ar' || newLang === 'en') {
      setLangState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ajjayer_lang', newLang);
      }
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('ajjayer_lang', next);
      }
      return next;
    });
  }, []);

  // Sync document element attributes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      if (isRTL) {
        document.body.classList.add('rtl-mode');
      } else {
        document.body.classList.remove('rtl-mode');
      }
    }
  }, [lang, dir, isRTL]);

  /**
   * Helper translation function: resolves dotted paths like 'nav.home'
   */
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    let current = translations[lang];
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English if missing in target language
        let enCurrent = translations.en;
        for (const p of parts) {
          if (enCurrent && typeof enCurrent === 'object' && p in enCurrent) {
            enCurrent = enCurrent[p];
          } else {
            return fallback || path;
          }
        }
        return enCurrent ?? fallback ?? path;
      }
    }
    return current ?? fallback ?? path;
  }, [lang]);

  /**
   * Helper to get localized service object by slug
   */
  const getLocalizedService = useCallback((service) => {
    if (!service) return null;
    if (lang === 'en') return service;
    const arData = servicesArabicData[service.slug];
    if (!arData) return service;

    return {
      ...service,
      title: arData.title || service.title,
      shortTitle: arData.shortTitle || service.shortTitle || service.title,
      descriptor: arData.descriptor || service.descriptor,
      tagline: arData.tagline || service.tagline,
      seoTitle: arData.seoTitle || service.seoTitle,
      metaDescription: arData.metaDescription || service.metaDescription,
      h1: arData.h1 || service.h1,
      technicalRef: arData.technicalRef || service.technicalRef,
      overview: arData.overview || service.overview,
      capabilities: service.capabilities.map((cap, idx) => ({
        ...cap,
        title: arData.capabilities?.[idx]?.title || cap.title,
        description: arData.capabilities?.[idx]?.description || cap.description
      })),
      faqs: arData.faqs || service.faqs,
      process: arData.process || service.process
    };
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    dir,
    isRTL,
    setLang,
    toggleLang,
    t,
    getLocalizedService
  }), [lang, dir, isRTL, setLang, toggleLang, t, getLocalizedService]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
