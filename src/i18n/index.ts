import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define language interface
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

// Supported languages configuration
export const supportedLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'ltr'  // Force LTR layout
  },
  {
    code: 'ku',
    name: 'Kurdish',
    nativeName: 'کوردی',
    flag: '🇮🇶',
    dir: 'ltr'  // Force LTR layout
  }
];

// RTL language detection
export const isRTL = (language: string): boolean => {
  const lang = supportedLanguages.find((l: Language) => l.code === language);
  return lang?.dir === 'rtl' || false;
};

// Document direction setter - DISABLED to keep LTR layout
export const setDocumentDirection = (language: string): void => {
  // Always keep LTR direction regardless of language
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = language;
};

// Number formatting utility
export const formatNumber = (number: number, language: string): string => {
  return new Intl.NumberFormat(language).format(number);
};

// Date formatting utility
export const formatDate = (date: Date, language: string): string => {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Currency formatting utility
export const formatCurrency = (amount: number, language: string, currency: string = 'USD'): string => {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupLocalStorage: 'preferred-language',
      caches: ['localStorage'],
    },

    // Backend options for loading translation files
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/{{lng}}/{{ns}}.missing.json',
    },

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already does escaping
      format: (value: any, format?: string, lng?: string) => {
        if (format === 'number' && typeof value === 'number') {
          return formatNumber(value, lng || 'en');
        }
        if (format === 'currency' && typeof value === 'number') {
          return formatCurrency(value, lng || 'en');
        }
        return value;
      }
    },

    // Namespace configuration
    ns: ['common', 'navigation', 'home', 'about', 'services', 'gallery', 'booking', 'contact'],
    defaultNS: 'common',

    // React-specific options
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added',
    },

    // Additional options for better performance
    load: 'languageOnly', // Load only language code (en) not region (en-US)
    cleanCode: true, // Clean language codes
    
    // Pluralization
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // Missing keys handling
    saveMissing: process.env.NODE_ENV === 'development',
    updateMissing: process.env.NODE_ENV === 'development',
    
    // Resources inline (for better performance in production)
    partialBundledLanguages: true,
  });

// Set initial document direction
setDocumentDirection(i18n.language);

// Listen for language changes to update document direction
i18n.on('languageChanged', (language: string) => {
  setDocumentDirection(language);
});

export default i18n;
