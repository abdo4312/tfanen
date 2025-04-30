import React, { createContext, useContext, useState, useCallback } from 'react';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';
import en from '../locales/en';
import ar from '../locales/ar';

type Language = 'en' | 'ar';

interface I18nContextType {
  t: (key: string, params?: object) => string;
  locale: Language;
  setLocale: (locale: Language) => void;
  isRTL: boolean;
}

const i18n = new I18n({
  en,
  ar,
});

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.enableFallback = true;

const I18nContext = createContext<I18nContextType>({
  t: (key: string) => key,
  locale: 'en',
  setLocale: () => {},
  isRTL: false,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Language>('en');

  const setLocale = useCallback((newLocale: Language) => {
    i18n.locale = newLocale;
    setLocaleState(newLocale);
    
    // Handle RTL
    const isRTL = newLocale === 'ar';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
    }
  }, []);

  const value = {
    t: (key: string, params?: object) => i18n.t(key, params),
    locale,
    setLocale,
    isRTL: locale === 'ar',
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}