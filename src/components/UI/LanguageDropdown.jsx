import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon, Icons } from '../../utils/icons';

/**
 * Language Dropdown Component
 * Allows users to select from 23 supported languages with flag icons
 */

const locales = [
    "en-GB",  // English
    "de-DE",  // German
    "it-IT",  // Italian
    "fr-FR"   // French
];

const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    const [selectedLocale, setSelectedLocale] = useState(() => {
        const storedLocale = localStorage.getItem('selectedLanguage');
        if (storedLocale && locales.includes(storedLocale)) {
            return storedLocale;
        }
        // Auto-detect browser language
        try {
            const browserLang = new Intl.Locale(navigator.language).language;
            const matchedLocale = locales.find(locale => {
                const localeLang = new Intl.Locale(locale).language;
                return localeLang === browserLang;
            });
            if (matchedLocale) {
                return matchedLocale;
            }
        } catch {
            // Fallback to en-GB if detection fails
        }
        return 'en-GB';
    });
    const [isOpen, setIsOpen] = useState(false);

    // Get flag image URL from country code
    const getFlagSrc = (countryCode) => {
        return /^[A-Z]{2}$/.test(countryCode)
            ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
            : "";
    };

    // Get other locales (exclude the selected one)
    const getOtherLocales = () => {
        return locales.filter(loc => loc !== selectedLocale);
    };

    // Get language display name in its native form
    const getLanguageName = (locale) => {
        try {
            const intlLocale = new Intl.Locale(locale);
            return new Intl.DisplayNames([locale], { type: "language" }).of(intlLocale.language);
        } catch {
            return locale;
        }
    };

    // Handle locale selection
    const handleLocaleSelect = (locale) => {
        setSelectedLocale(locale);
        localStorage.setItem('selectedLanguage', locale);

        // Change i18n language (convert en-GB to en)
        const langCode = locale.split('-')[0];
        i18n.changeLanguage(langCode);

        setIsOpen(false);
    };

    // Toggle dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.language_dropdown')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const currentIntlLocale = new Intl.Locale(selectedLocale);

    return (
        <div className="language_dropdown">
            <button
                id="language_active_btn"
                onClick={toggleDropdown}
                type="button"
            >
                <span>
                    <img src={getFlagSrc(currentIntlLocale.region)} alt={selectedLocale} />
                </span>
                <FontAwesomeIcon icon={Icons.AngleDown} />
            </button>
            <div
                className="language_dropdown"
                id="language_dropdown"
                style={{ display: isOpen ? 'block' : '' }}
            >
                <ul className="unordered_list_block">
                    {getOtherLocales().map((locale) => {
                        const intlLocale = new Intl.Locale(locale);
                        const langName = getLanguageName(locale);

                        return (
                            <li
                                key={locale}
                                onClick={() => handleLocaleSelect(locale)}
                            >
                                {langName} <img src={getFlagSrc(intlLocale.region)} alt={locale} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default LanguageDropdown;
