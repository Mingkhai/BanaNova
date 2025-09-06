
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../locales/translations';

export type Locale = 'en' | 'vi';

interface LocalizationContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => any;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default to browser language if it's Vietnamese, otherwise English
    const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
    const defaultLocale: Locale = browserLang === 'vi' ? 'vi' : 'en';
    
    const [locale, setLocale] = useState<Locale>(defaultLocale);

    const t = (key: string): any => {
        const keys = key.split('.');
        
        const findTranslation = (lang: Locale) => {
            let result: any = translations[lang];
            for (const k of keys) {
                if (result === undefined) break;
                result = result[k];
            }
            return result;
        };

        const translated = findTranslation(locale);
        if (translated !== undefined) {
            return translated;
        }

        // Fallback to English if translation is missing in current locale
        if (locale !== 'en') {
            const fallback = findTranslation('en');
            if (fallback !== undefined) return fallback;
        }

        return key; // Return the key if no translation is found
    };

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};
