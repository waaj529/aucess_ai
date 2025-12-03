import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import frTranslations from './locales/fr.json';

// Translation resources
const resources = {
    en: {
        translation: enTranslations
    },
    de: {
        translation: deTranslations
    },
    it: {
        translation: itTranslations
    },
    fr: {
        translation: frTranslations
    }
};

i18n
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        resources,
        fallbackLng: 'en', // Fallback language
        debug: false, // Set to true for development debugging

        // Language detection options
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'selectedLanguage'
        },

        interpolation: {
            escapeValue: false // React already escapes values
        },

        react: {
            useSuspense: false // Disable suspense for simpler setup
        }
    });

export default i18n;
