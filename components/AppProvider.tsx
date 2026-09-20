'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

type Language = 'en' | 'ms';
type Theme = 'light' | 'dark';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedLang = localStorage.getItem('app_lang') as Language;
    const storedTheme = localStorage.getItem('app_theme') as Theme;
    
    if (storedLang) setLang(storedLang);
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('app_lang', lang);
    }
  }, [lang, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('app_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  const t = (key: TranslationKey): string => {
    if (!mounted) return translations['en'][key] || key;
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
